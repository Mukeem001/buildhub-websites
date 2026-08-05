import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Menu from './Pages/Menu';
import Cart from './Pages/Cart';
import FoodDetails from './Pages/FoodDetail';
import Wishlist from './Pages/Wishlist';
import Profile from './Pages/Profile';
import Login from './Pages/Login';

import Navbar from './componenet/Navbar';
import Footer from './componenet/Footer';
import Explorenow from './Pages/Explorenow';
import Address from './Pages/Address';
import Payment from './Pages/Payment';
import OrderComplete from './Pages/Ordercomplete';
import TrackOrder from './Pages/Trackorder';
import Signup from './Pages/SignUp';
import ForgetPassword from './Pages/Forgetpassword';







const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (food) => {
    const existing = cartItems.find(item => item.id === food.id);

    if (existing) {
      setCartItems(
        cartItems.map(item =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        { ...food, quantity: 1 }
      ]);
    }
  };

  return (
    <BrowserRouter>
      <Navbar cartCount={cartItems.length} />
      <Routes>
         <Route index element={<Home />} />
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/menu" element={<Menu addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/fooddetail" element={<FoodDetails addToCart={addToCart} />} />
        <Route path="/wishlist" element={<Wishlist addToCart={addToCart} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explorenow" element={<Explorenow />} />
        <Route path="/address" element={<Address />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/ordercomplete" element={<OrderComplete />} />
        <Route path="/trackorder" element={<TrackOrder />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />



      </Routes>
      <Footer />
    </BrowserRouter>

  );
};

export default App