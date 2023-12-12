"use client";
import { db, auth } from "@/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useUserStore } from "./../../zustand/store";
import { useRouter } from "next/navigation";
import Link from "next/link";

function DetailCard({ details }) {
  const colors = ["Green", "White", "Yellow"];
  const size = [25, 26, 27, 28, 29, 30];
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState(0);
  const router = useRouter();

  const { updateCart, updateUser } = useUserStore((state) => state);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const addToCart = async (event, product) => {
    event.preventDefault();
    if (!auth.currentUser) {
      router.push("/login");
    } else {
      const uid = auth.currentUser.uid;
      const userRef = doc(db, "users", uid);
      try {
        const userSnap = await getDoc(userRef);
        let updatedCart = [];
        if (userSnap.exists()) {
          const userData = userSnap.data();
          updatedCart.push(...userData.cart);
        }
        const productIndex = updatedCart.findIndex(
          (item) => item.id === product.id
        );
        if (productIndex === -1) {
          // Add the product to the cart with a quantity of 1
          updatedCart.push({
            ...product,
            quantity: 1,
            color: selectedColor,
            size: selectedSize,
          });
        } else {
          // Increase the quantity of the product in the cart by 1
          updatedCart[productIndex].quantity += 1;
        }
        await setDoc(userRef, { cart: updatedCart });
        updateCart(updatedCart);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full lg:w-[400px]">
      <div>
        <h1 className="bg-indigo-600 w-32 text-[#fafafa] text-center py-2 rounded-md font-semibold text-sm">
          New Release
        </h1>
      </div>
      <div>
        <h1 className="font-bold text-[32px] text-[#232321] ">
          {details.name}
        </h1>
        <p className="text-lg font-medium text-gray-600">{details.category}</p>
        <p className="text-[24px] font-bold text-indigo-600">
          PHP{details.price.toLocaleString()}
        </p>
      </div>
      <form className="flex flex-col gap-4">
        <div className="mb-5">
          <h1 className="text-[#232321] uppercase font-bold text-sm mb-2">
            Colors
          </h1>
          <div className="flex gap-5">
            {colors.map((color, index) => {
              return (
                <div key={index} className="flex flex-col">
                  <input
                    type="radio"
                    id={color}
                    name="drone"
                    value={color}
                    className="w-10 h-10"
                    style={{
                      accentColor: color,
                      backgroundColor: color,
                    }}
                    checked={selectedColor === color}
                    onChange={() => handleColorChange(color)}
                  />
                  <label
                    className="font-bold text-sm text-[#232321]"
                    htmlFor={color}
                  >
                    {color}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h1 className="text-[#232321] uppercase font-bold text-sm mb-2">
            Size
          </h1>
          <div className="flex gap-3">
            {size.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`flex items-center justify-center w-12 h-12 hover:text-[#fafafa] hover:bg-[#232321] bg-gray-100 font-semibold text-[#232321] rounded-md ${
                    selectedSize
                      ? "active:text-[#fafafa] active:bg-[#232321]"
                      : ""
                  }`}
                  onClick={() => handleSizeChange(item)}
                >
                  <h1>{item}</h1>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex w-full gap-2">
            <button
              onClick={(event) => addToCart(event, details)}
              className="bg-[#232321] py-3 font-semibold text-sm rounded-md uppercase text-[#fafafa] w-[85%]"
            >
              Add To Cart
            </button>
            <button className="bg-[#232321] text-[#fafafa] rounded-md w-[15%] flex items-center justify-center">
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
          </div>
          <Link
            href="/cart"
            className="font-semibold text-sm transition duration-200 ease-in bg-[#4A69E2] text-center hover:bg-[#6a6969] text-[#fafafa] py-3 uppercase rounded-md"
          >
            Buy it Now
          </Link>
        </div>
      </form>
      <div>
        <p className="text-sm font-semibold text-gray-500">
          This product is excluded from site promotions and discounts.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-lg font-bold">About The Product</h1>
        <p className="text-sm font-medium text-gray-500">
          {details.description}
        </p>
      </div>
    </div>
  );
}

export default DetailCard;
