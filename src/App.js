import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductView from "./pages/ProductView";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import GetSlug from "./components/GetSlug";
import GetProductByStyle from "./components/GetProductByStyle";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ToggleMode from "./components/ToggleMode";
import { useEffect } from "react";

import "./sass/index.scss";

// const cartFromLocalStoreage = JSON.parse(localStorage.getItem("cartItems"));

const username =
  JSON.parse(localStorage.getItem("ACCOUNT")) !== null
    ? JSON.parse(localStorage.getItem("ACCOUNT"))
    : null;

function App() {
  useEffect(() => {
    const fetchData = async () => {
      if (username !== null) {
        const temp = await axios.get(
          process.env.REACT_APP_API + "getCartByUser/" + username
        );
        return temp.data[0].cartdeta;
      }
    };
    const excute = async () => {
      localStorage.setItem("CART-ITEMS", JSON.stringify(await fetchData()));
    };
    excute();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/products/:stylePath"
          element={<GetProductByStyle />}
        ></Route>
        <Route path="/detail/:slug" element={<GetSlug />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
      <ToggleMode />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
