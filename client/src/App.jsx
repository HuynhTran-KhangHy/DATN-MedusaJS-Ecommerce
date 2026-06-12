import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import AuthSuccess from './pages/AuthSuccess';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';

// Admin Imports
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import Orders from './pages/admin/Orders';
import Categories from './pages/admin/Categories';
import Customers from './pages/admin/Customers';
import Users from './pages/admin/Users';
import Settings from './pages/admin/Settings';

// Seller Pages
import SellerLayout from './layouts/SellerLayout';
import ProductList from './pages/seller/ProductList';
import AddProduct from './pages/seller/AddProduct';
import EditProduct from './pages/seller/EditProduct';

// Admin Pages
import AdminLayout from './layouts/AdminLayout';
import UserManagement from './pages/admin/UserManagement';
import ProductApproval from './pages/admin/ProductApproval';

// Import Global CSS
import './assets/css/client/style.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Client Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="auth-success" element={<AuthSuccess />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="categories" element={<Categories />} />
          <Route path="customers" element={<Customers />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Seller Routes */}
        <Route path="/seller" element={<SellerLayout />}>
          <Route index element={<ProductList />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<UserManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<ProductApproval />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
