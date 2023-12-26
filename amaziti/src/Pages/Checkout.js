import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetCart } from "../redux/amazonSlice";
import { Link } from "react-router-dom";
import CreditCardForm from "./CreditCardForm";

const Checkout = () => {
  const amazon = useSelector((state) => state.amazon);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (amazon) {
      const total = amazon.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setTotalPrice(total);
    }
  }, [amazon]);

  return (
    <div className="w-full bg-gray-100 p-4">
      <div className="container mx-auto h-auto grid grid-cols-5 gap-8">
        <div className="w-full bg-white px-4 col-span-5 xl:col-span-4">
          <img
            className="w-full mb-8 rounded"
            src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
            alt=""
          />
          <div className="font-titleFont  flex items-center justify-between border-b-[1px] border-b-gray-400 py-3">
            <h1 className="text-2xl font-semibold">Checkout</h1>
            <h3 className="text-lg font-semibold">Order Summary</h3>
            <Link to="/">
              <p className="px-4 py-2 my-2 flex items-center justify-center bg-blue-400 hover:bg-blue-600 active:bg-red-500 text-white rounded-lg font-titleFont font-semibold text-lg tracking-wide">
                Home page
              </p>
            </Link>
          </div>

          {amazon && amazon.products.length > 0 ? (
            <div>
              {amazon.products.map((item) => (
                <div
                  key={item.id}
                  className="w-full border-b-2 p-4 flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="text-lg font-semibold">{item.title}</p>
                    <p className="text-gray-600">${item.price}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Your basket is empty.</p>
          )}

          <div className="w-full">
            <button
              onClick={() => dispatch(resetCart())}
              className="px-8 py-2 my-4 bg-red-500 hover:bg-red-600 active:bg-red-500 text-white rounded-lg font-titleFont font-semibold text-lg tracking-wide">
              Clear Cart
            </button>
          </div>
        </div>

        <div className="col-span-5 md:col-span-3 lg:col-span-2 xl:col-span-1 bg-white h-auto flex flex-col items-center p-4 ">
          <div className="flex flex-col items-center gap-4 text-md bg-blue-100 font-medium py-4 px-2 mb-4 rounded">
            <p className="text-center">
              Get in on the perks. We're giving you 30 days of Prime benefits
              for FREE.
            </p>
            <button className="w-full text-sm py-2 font-normal rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput">
              Try Prime FREE
            </button>
          </div>

          <div className="col-span-5 md:col-span-3 lg:col-span-2 xl:col-span-1 bg-blue-100 h-auto flex flex-col items-center p-4">
            {totalPrice !== undefined && (
              <div className="w-full mb-2">
                <p className="text-base font-semibold p-1 justify-between">
                  Subtotal:{" "}
                  <span className="text-sm font-bold">${totalPrice}</span>
                </p>
              </div>
            )}

            <div className="w-full h-8 text-xs font-semibold bg-opacity-50 text-white rounded-lg cursor-not-allowed">
              <CreditCardForm />
            </div>

            <button className="w-full text-sm py-2 font-medium rounded-md bg-gradient-to-tr from-yellow-400 to-yellow-200 hover:from-yellow-300 hover:to-yellow-400 border border-yellow-500 hover:border-yellow-700 active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 mb-2">
              Place your order
            </button>

            <p className="flex items-center gap-2 text-sm">
              Your Order qualifies for Free shipping. Choose this option at
              Checkout. See details...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
