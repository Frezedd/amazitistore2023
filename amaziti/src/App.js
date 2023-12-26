import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { ProductsData } from "./api/api";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Resgistration from "./Pages/Resgistration";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Order from "./Pages/Order";

// import Payment from "./Pages/Payment";

const Layout = () => {
  return (
    <div>
      <Header />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} loader={ProductsData}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Route>

        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/resgistration" element={<Resgistration/>}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/order" element={<Order />}></Route>

        
      </Route>
    )
  );
  return (
    <div className="font-bodyFont bg-gray-100">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
