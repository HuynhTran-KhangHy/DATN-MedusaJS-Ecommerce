import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on init
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, variant, quantity) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => 
        item.id === product.id && item.variantId === (variant?.id || 'base')
      );

      if (existingItem) {
        return prev.map(item => 
          item.id === product.id && item.variantId === (variant?.id || 'base')
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, {
        id: product.id,
        name: product.name,
        price: variant ? variant.price : product.price,
        image: variant?.image || product.image,
        variantId: variant?.id || 'base',
        variantLabel: variant ? `${variant.color || ''} / ${variant.size || ''}`.trim().replace(/^\/|\/$/g, '') : '',
        quantity
      }];
    });
  };

  const removeFromCart = (id, variantId) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.variantId === variantId)));
  };

  const updateQuantity = (id, variantId, newQty) => {
    if (newQty < 1) return;
    setCartItems(prev => prev.map(item => 
      item.id === id && item.variantId === variantId
        ? { ...item, quantity: newQty }
        : item
    ));
  };

  const clearCart = () => setCartItems([]);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      subtotal,
      totalItems 
    }}>
      {children}
    </CartContext.Provider>
  );
};
