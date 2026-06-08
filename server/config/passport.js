const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { id, emails, displayName, photos } = profile;
        const email = emails[0].value;
        const avatar = photos[0].value;

        let user = await User.findOne({ where: { googleId: id } });

        if (user) {
          user.name = displayName;
          user.avatar = avatar;
          await user.save();
          return done(null, user);
        }

        user = await User.findOne({ where: { email } });
        if (user) {
          user.googleId = id;
          user.avatar = avatar;
          await user.save();
          return done(null, user);
        }

        user = await User.create({
          googleId: id,
          email,
          name: displayName,
          avatar,
        });

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
