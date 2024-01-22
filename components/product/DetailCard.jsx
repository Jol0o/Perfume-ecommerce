"use client";
import { db, auth } from "@/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DetailCard({ details }) {
  const router = useRouter();
  const [oilbase, setOilbase] = useState(0);
  const [amount, setAmount] = useState(0);

  // const handleColorChange = (color) => {
  //   setSelectedColor(color);
  // };

  // const handleSizeChange = (size) => {
  //   setSelectedSize(size);
  // };

  const addToCart = async (event, product) => {
    event.preventDefault();
    if (!auth.currentUser) {
      router.push("/login");
    } else {
      const uid = auth.currentUser.uid;
      const userRef = doc(db, "cart", uid);
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
            oilbaseAmount: oilbase,
            amount,
            uid,
          });
          toast.success("Product added to cart successfully!", {
            position: "top-right",
          });
        } else {
          // Increase the quantity of the product in the cart by 1
          updatedCart[productIndex].quantity += 1;
          toast.success("Added product quantity to cart successfully!", {
            position: "top-right",
          });
        }
        await setDoc(userRef, { cart: updatedCart });
      } catch (error) {
        console.error(error);
        toast.error("Error adding the product in your cart!", {
          position: "top-right",
        });
      }
    }
  };

  const buy = async (event, product) => {
    event.preventDefault();
    if (!auth.currentUser) {
      router.push("/login");
    } else {
      const uid = auth.currentUser.uid;
      const userRef = doc(db, "cart", uid);
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
            oilbaseAmount: oilbase,
            amount,
            uid,
          });
        } else {
          // Increase the quantity of the product in the cart by 1
          updatedCart[productIndex].quantity += 1;
        }
        await setDoc(userRef, { cart: updatedCart });
        router.push("/cart");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full lg:w-[400px]">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div>
        <h1 className="bg-indigo-600 w-32 text-[#fafafa] text-center py-2 rounded-md font-semibold text-sm">
          New Release
        </h1>
      </div>
      <div>
        <h1 className="font-bold text-[32px] text-[#232321] ">
          {details.name}
        </h1>
        <p className="font-medium text-gray-600 text-md">
          Oilbase: {details.oilbaseAmount}ml
        </p>
        <p className="text-[24px] font-bold text-indigo-600">
          {details.price.toLocaleString()} PHP
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-lg font-bold">About The Product</h1>
        <p className="text-sm font-medium text-gray-500">
          {details.description}
        </p>
      </div>

      <form className="flex flex-col gap-4">
        <input
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className={`${
            open ? "w-38 p-2 border" : "w-0"
          } outline-none  ease-out duration-300 capitalize  rounded-md mr-2`}
        />{" "}
        <input
          type="number"
          max={details.oilbaseAmount}
          onChange={(e) => setOilbase(e.target.value)}
          placeholder="Enter oil based amount"
          className={`${
            open ? "w-38 p-2 border" : "w-0"
          } outline-none  ease-out duration-300 capitalize  rounded-md mr-2`}
        />
        {/* <div className="mb-5">
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
        </div> */}
        {/* <div>
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
        </div> */}
        <div className="flex flex-col gap-2">
          <button
            onClick={(event) => addToCart(event, details)}
            className="bg-[#232321] py-3 font-semibold text-sm rounded-md uppercase text-[#fafafa] w-full"
          >
            Add To Cart
          </button>

          <button
            onClick={(event) => buy(event, details)}
            className="font-semibold text-sm transition duration-200 ease-in bg-[#4A69E2] text-center hover:bg-[#6a6969] text-[#fafafa] py-3 uppercase rounded-md"
          >
            Buy
          </button>
        </div>
      </form>
      <div>
        <p className="text-sm font-semibold text-gray-500">
          This product is excluded from site promotions and discounts.
        </p>
      </div>
    </div>
  );
}

export default DetailCard;
