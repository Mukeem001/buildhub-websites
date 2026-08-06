import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const basePath = typeof window !== "undefined" ? window.location.pathname.replace(/\/$/, "") : "/";

import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Wishlist from "./Pages/Wishlist";
import Profile from "./Pages/Profile";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Signup from "./Pages/Signup";
import Address from "./Pages/Address";
import Payment from "./Pages/Payment";
import OrderSuccess from "./Pages/Order-success";
import Trackorder from "./Pages/Trackorder";
import ForgetPassword from "./Pages/Forgetpassword";






function App() {
  return (
    <BrowserRouter basename={basePath}>
    <Navbar/>


      <Routes>

         <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/address" element={<Address />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/track-order" element={<Trackorder />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />

        

      </Routes>

      <Footer/>



    </BrowserRouter>
  );
}

export default App;