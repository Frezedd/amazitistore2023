import React, { useEffect, useState } from "react";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51OQD4iFealxv0C5f8rVCTkLRE5NjC94Qh9RrAVXCcB6J0QSpJuGvNGQi2bmXdpue07zWJYtjDt6pJeYQZN5MC12800bhvvxXwO"
);

const CreditCardForm = () => {
  const [stripe, setStripe] = useState();

  useEffect(() => {
    const initialstripe = async () => {
      const stripeinstance = await loadStripe(
        "pk_test_51OQD4iFealxv0C5f8rVCTkLRE5NjC94Qh9RrAVXCcB6J0QSpJuGvNGQi2bmXdpue07zWJYtjDt6pJeYQZN5MC12800bhvvxXwO"
      );
      setStripe(stripeinstance);
    };
    initialstripe();
  }, []);

  const handlePayment = (creditCardInfo) => {
    fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ creditCardInfo }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Payment response from backend:", data);
      })
      .catch((error) => {
        console.error("Error submitting payment:", error);
      });
  };

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CardElement />
      </Elements>
    </div>
  );
};

export default CreditCardForm;
