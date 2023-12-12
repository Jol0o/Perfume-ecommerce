import { useUserStore } from "@/zustand/store";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";

function CheckOut() {
  const { cart } = useUserStore((state) => state);

  const handleClick = async () => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_PUBLISH_KEY);

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
      body: JSON.stringify(cart),
    });

    const data = await response.json();
    if (data.session) {
      const result = await stripe.redirectToCheckout({
        sessionId: data.session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        type="submit"
        className="font-semibold text-sm transition duration-200 ease-in bg-[#232321] hover:bg-[#6a6969] text-[#fafafa] py-3 uppercase rounded-md"
      >
        Checkout
      </button>
    </>
  );
}

export default CheckOut;
