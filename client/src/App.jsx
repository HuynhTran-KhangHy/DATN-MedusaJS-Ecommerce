import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import AuthSuccess from './pages/AuthSuccess';

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
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth-success" element={<AuthSuccess />} />
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
