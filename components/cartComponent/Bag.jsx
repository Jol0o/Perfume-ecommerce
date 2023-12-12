"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Order from "./Order";
import { auth, db } from "@/firebase/config";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useUserStore } from "./../../zustand/store";

function Bag() {
  const { updateCart, cart } = useUserStore((state) => state);

  useEffect(() => {
    cart;
  }, []);

  const addQuantity = async (id) => {
    const userRef = doc(db, "users", auth.currentUser.uid);

    const cartItemSnapshot = await getDoc(userRef);
    const data = cartItemSnapshot.data();
    const product = data.cart;

    const itemIndex = product.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      const item = product[itemIndex];
      if (item && item.quantity !== undefined) {
        item.quantity += 1;
        await updateDoc(userRef, { cart: product });
        updateCart(product);
      }
    }
  };

  const minusQuantity = async (id) => {
    const userRef = doc(db, "users", auth.currentUser.uid);

    const cartItemSnapshot = await getDoc(userRef);
    const data = cartItemSnapshot.data();
    const product = data.cart;

    const itemIndex = product.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      const item = product[itemIndex];
      if (item && item.quantity !== undefined) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          await updateDoc(userRef, { cart: product });
          updateCart(product);
        } else if (item.quantity === 1) {
          product.splice(itemIndex, 1);
          await updateDoc(userRef, { cart: product });
          updateCart(product);
        }
      }
    }
  };

  const deleteItem = async (id) => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const cart = userData.cart;

      const updatedCart = cart.filter((item) => item.id !== id);

      await updateDoc(userRef, { cart: updatedCart });
      console.log("Item successfully deleted!");

      updateCart(updatedCart); // Assuming you have a function to update the cart state
    } else {
      console.error("User document not found!");
    }
  };

  return (
    <>
      <div className="w-[clamp(100px,80%,500px)]">
        <h1 className="text-[clamp(20px,5vw,30px)] font-bold">
          Saving to celebrate
        </h1>
        <p className="text-[clamp(12px,3vw,15px)] text-gray-500 font-semibold">
          Enjoy up to 60% off thousands of styles during the End of Year sale -
          while suppiles last. No code needed.
        </p>
        <div className="text-[clamp(12px,3vw,15px)] font-semibold text-gray-500 ">
          <span>Join Us</span> or <span>Sign In</span>
        </div>
      </div>
      <div className="flex flex-col ease-in w-full lg:w-[800px] xl:w-[1300px] gap-5 mt-4 md:flex-row">
        <div className="bg-[#FAFAFA] p-5 rounded-xl w-full">
          <div>
            <h1 className="text-2xl font-semibold">Your Bag</h1>
            <p className="text-sm font-medium text-gray-500">
              Items in your bag not reserved- check out now to make them yours.
            </p>
          </div>
          <div className="flex flex-col gap-3 mt-5">
            {cart.map((item, index) => {
              return (
                <div key={index} className="flex w-full gap-5 justify-evenly">
                  <Image
                    src={item.image[0]}
                    alt="item"
                    height={200}
                    width={200}
                    className="rounded-md"
                  />
                  <div className="w-[clamp(100px,100%,300px)] flex flex-col gap-1">
                    <h1 className="font-bold text-[clamp(20px,3vw,30px)]">
                      {item.name}
                    </h1>
                    <p className="font-semibold text-gray-600 text-[clamp(15px,3vw,20px)] ">
                      {item.category}
                    </p>
                    <p className="capitalize font-semibold text-gray-600 text-[clamp(15px,3vw,20px)] ">
                      {item.color}
                    </p>
                    <div className="flex text-center w-full justify-between font-semibold text-gray-600 text-[clamp(12px,3vw,18px)] ">
                      <h1>Size {item.size}</h1>
                      <div className="flex flex-wrap gap-2">
                        <p>Quantity {item.quantity}</p>
                        <div className="flex gap-1">
                          <button
                            onClick={() => addQuantity(item.id)}
                            className="w-5 transition duration-200 ease-in rounded-sm bg-[#E7E7E3] hover:text-[#fafafa] hover:bg-[#4A69E2]"
                          >
                            +
                          </button>
                          <button
                            onClick={() => minusQuantity(item.id)}
                            className="w-5  transition duration-200 ease-in rounded-sm bg-[#E7E7E3] hover:text-[#fafafa] hover:bg-[#4A69E2]"
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="block md:hidden">
                      <p className="text-[#4A69E2] font-bold text-xl">
                        ₱{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-20">
                      <button className="p-1 transition duration-200 ease-in rounded-md hover:text-[#fafafa] hover:bg-[#4A69E2]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="p-1 transition duration-200 ease-in rounded-md hover:text-[#fafafa] hover:bg-[#4A69E2]"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <p className="text-[#4A69E2] font-bold text-xl">
                      ₱{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Order />
      </div>
    </>
  );
}

export default Bag;
