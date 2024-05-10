"use client";

import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "@/components/payment/CheckoutForm";

import { useSelector, useDispatch } from "react-redux";
import { getClientSecret } from "@/app/redux/features/payment/paymentSlice";

const stripePromise = loadStripe(
  "pk_test_51NPTbIAkAJLkCEv2uze6fXuHQaMUBd0LcASvdSVW3si3nE6hUArwNFL0cx9cfVy5arcpJBWsDlYlIMNLUIOdfDpZ009Q4UGOdz"
);

export default function Page() {
  const dispatch = useDispatch();
  const {
    clientSecret: { clientSecret },
  } = useSelector((state: any) => state.payment);

  useEffect(() => {
    dispatch(getClientSecret());
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="w-full h-screen flex flex-col justify-center items-center">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </>
  );
}
