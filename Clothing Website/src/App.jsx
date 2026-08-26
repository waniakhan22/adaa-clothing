import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Women from './components/Women';
import Men from './components/Men';
import Kids from './components/Kids';
import Fabrics from './components/Fabrics';
import ReadyToWear from './components/ReadyToWear';
import Tailored from './components/Tailored';
import Footer from './components/Footer';
import Profile from "./components/Profile";
import Search from "./components/Search";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";
import Login from './components/userLogin';
import Signup from './components/userSignUp';
import Wishlist from './components/Wishlist';

import './App.css';

const CategoryPage = ({ category, bannerImg }) => {
  return (
    <div
      className="category-banner"
      style={{
        backgroundImage: `url(${bannerImg})`,
        height: '80vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    />
  );
};

function App() {
  return (
    <>

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <Products />
              <Footer />
            </>
          }
        />

        {/* Categories */}
        <Route
          path="/women"
          element={
            <>
              <Navbar />
              <Women />
              <Footer />
            </>
          }
        />

        <Route
          path="/men"
          element={
            <>
              <Navbar />
              <Men />
              <Footer />
            </>
          }
        />

        <Route
          path="/kids"
          element={
            <>
              <Navbar />
              <Kids />
              <Footer />
            </>
          }
        />

        <Route
          path="/new"
          element={
            <>
              <Navbar />
              <Products />
              <Footer />
            </>
          }
        />

        <Route
          path="/sale"
          element={
            <>
              <Navbar />
              <Products />
              <Footer />
            </>
          }
        />

        <Route
          path="/fabrics"
          element={
            <>
              <Navbar />
              <Fabrics />
              <Footer />
            </>
          }
        />

        <Route
          path="/ready-to-wear"
          element={
            <>
              <Navbar />
              <ReadyToWear />
              <Footer />
            </>
          }
        />

        <Route
          path="/tailored"
          element={
            <>
              <Navbar />
              <Tailored />
              <Footer />
            </>
          }
        />

        {/* User Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
<Route path="/profile" element={<Profile />} />
<Route path="/search" element={<Search />} />
<Route path="/cart" element={<Cart />} />
<Route
  path="/wishlist"
  element={
    <>
      <Navbar />
      <Wishlist />
      <Footer />
    </>
  }
/>
<Route path="/checkout" element={<Checkout />} />
<Route
  path="/order-success"
  element={<OrderSuccess />}
/>
      </Routes>

    </>
  );
}

export default App;