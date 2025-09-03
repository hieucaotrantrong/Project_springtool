import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footers from './components/Footers';
import Carousel from './components/Carousel';
import CategoryGrid from './components/CategoryGrid';
import FlashSale from './components/FlashSale';
import MallSection from './components/MallSection';
import Home from './components/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminPage from './pages/AdminPage';
import PrivateRoute from './service/PrivateRoute';
import CartPage from "./components/CartPage";
import CartPageView from "./components/CartPageView";
import ProductDetail from "./components/ProductDetail";
import ChatBotIcon from "./components/ChatBotIcon";
import CartPayPage from "./components/CartPayPage";
import SupportPage from "./components/SupportPage";
import PromoBanner from './components/PromoBanner';
import Profile from './pages/Profile';
import WalletPage from './components/WalletPage';
import OrderHistory from './components/OrderHistory';
import { useState } from 'react';

/*----------------------------------
Home Create
-----------------------------------*/
function HomePage() {
  return (
    <>
      <Header />
      <Carousel />
      <CategoryGrid />
      <PromoBanner />
      <FlashSale />
      <MallSection />
      <Footers />
    </>
  );
}
/*----------------------------------
HomePage
-----------------------------------*/
function HomeLoggedInPage() {
  const [hasFilter, setHasFilter] = useState(false);

  return (
    <>
      <Home onFilterChange={setHasFilter} />
      {!hasFilter && (
        <>
          <Carousel />
          <CartPage />
        </>
      )}
      <ChatBotIcon />
      <Footers />
    </>
  );
}
/*----------------------------------
Router
-----------------------------------*/
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomeLoggedInPage />} />
          <Route path="/cart" element={<CartPageView />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cartpay" element={<CartPayPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          } />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;












