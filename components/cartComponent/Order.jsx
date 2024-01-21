"use client";
import { useUserStore } from "@/zustand/store";
import React, { useState, useEffect } from "react";
import CheckOut from "./../buttons/CheckOut";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase/config";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

function Order({ cart }) {
  const [fee, setFee] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calculateFee();
    calculateTotal();
  }, [cart]);

  const calculateFee = () => {
    let calculatedFee = 0;
    if (total >= 10000) {
      calculatedFee = 250;
    } else {
      calculatedFee = 150;
    }
    setFee(calculatedFee);
  };

  const calculateTotal = () => {
    const calculatedTotal = cart.reduce((accumulator, item) => {
      const itemTotal = item.price * item.quantity;
      return accumulator + itemTotal;
    }, 0);
    setTotal(calculatedTotal);
  };

  return (
    <div className="w-full  md:w-[clamp(200px,100%,500px)]">
      <h1 className="text-2xl font-bold text-[#232321]">Order Summary</h1>
      <div className="flex flex-col gap-4 mt-5">
        <div className="flex items-start justify-between text-lg font-semibold text-gray-600 text-semibold">
          <p className="font-bold text-[#232321]">{cart.length} ITEM</p>
          <div className="min-h-[50px]">
            {cart.map((item) => {
              return <p key={item}>PHP {(item.price * item.quantity).toLocaleString()}</p>;
            })}
          </div>
        </div>
        <div className="flex items-center justify-between text-lg font-semibold text-gray-600 text-semibold">
          <p className="font-bold text-[#232321]">Delivery Fee</p>
          <p>PHP {fee}</p>
        </div>
        <div className="flex items-center justify-between text-lg font-semibold text-gray-600 text-semibold">
          <p className="font-bold text-xl text-[#232321]">Total</p>
          <p>PHP {total.toLocaleString()}</p>
        </div>
        {/* <CheckOut cart={cart}/> */}
        <button  className="font-semibold text-sm transition duration-200 ease-in bg-[#232321] hover:bg-[#6a6969] text-[#fafafa] py-3 uppercase rounded-md">Comming soon</button>
      </div>
    </div>
  );
}

export default Order;
