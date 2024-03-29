"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Order from "./Order";
import { auth, db } from "@/firebase/config";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useUserStore } from "./../../zustand/store";
import { useRouter } from "next/navigation";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Bag() {
  const [cart, setCart] = useState([]);
  const router = useRouter();
  const [uid, setUid] = useState("");

  useEffect(() => {
    if (!auth.currentUser) {
      const id = localStorage.getItem("uid");
      setUid(localStorage.getItem("uid"));
      if (!id) {
        router.push("/login");
        return;
      }
    } else {
      setUid(auth.currentUser.uid);
    }
  });

  const fetchData = async () => {
    try {
      const userRef = doc(db, "cart", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        setCart(userData.cart);
      } else {
        console.error(`No document found for uid: ${uid}`);
      }
    } catch (error) {
      toast.error("Error getting your data!", {
        position: "top-right",
      });
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!uid) return;

    fetchData();
  }, [uid]);

  const addQuantity = async (id) => {
    const userRef = doc(db, "cart", auth.currentUser.uid);

    const cartItemSnapshot = await getDoc(userRef);
    const data = cartItemSnapshot.data();
    const product = [...data.cart]; // create a new copy of the cart

    const itemIndex = product.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      const item = { ...product[itemIndex] }; // create a new copy of the item
      if (item && item.quantity !== undefined) {
        item.quantity += 1;
        product[itemIndex] = item; // replace the item in the cart
        await updateDoc(userRef, { cart: product });
        toast.success("Successeful adding quantity!", {
          position: "top-right",
        });
      }
      fetchData();
    }
  };

  const minusQuantity = async (id) => {
    const userRef = doc(db, "cart", auth.currentUser.uid);

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
          toast.success("Successful in reducing quantity!", {
            position: "top-right",
          });
        } else if (item.quantity === 1) {
          product.splice(itemIndex, 1);
          await updateDoc(userRef, { cart: product });
          toast.success("Successful in deleting the item!", {
            position: "top-right",
          });
        }
      }
      fetchData();
    }
  };

  const deleteItem = async (id) => {
    const userRef = doc(db, "cart", auth.currentUser.uid);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      const cart = userData.cart;

      const updatedCart = cart.filter((item) => item.id !== id);

      await updateDoc(userRef, { cart: updatedCart });
      toast.success("Item successfully deleted!", {
        position: "top-right",
      });
      fetchData();
      // Assuming you have a function to update the cart state
    } else {
      toast.error("User document not found!", {
        position: "top-right",
      });
      console.error("User document not found!");
    }
  };

  return (
    <>
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
                <div
                  key={item.id || index}
                  className="flex w-full gap-5 justify-evenly"
                >
                  <Image
                    src={item.imageUrl}
                    alt="item"
                    height={200}
                    width={200}
                    className="rounded-md"
                  />
                  <div className="w-[clamp(100px,100%,300px)] flex flex-col gap-1">
                    <h1 className="font-bold text-[clamp(20px,3vw,30px)]">
                      {item.name}
                    </h1>
                    <p className="font-semibold text-gray-600 capitalize text-[clamp(15px,3vw,18px)] ">
                      {item.genderType}
                    </p>
                    <div className="flex text-center w-full justify-between font-semibold text-gray-600 text-[clamp(12px,3vw,18px)] ">
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
                    <p className="text-[#4A69E2] font-bold text-md">
                      50ml
                    </p>
                    <div className="block md:hidden">
                      <p className="text-[#4A69E2] font-bold text-xl">
                        ₱{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-20">
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
        <Order cart={cart} />
      </div>
    </>
  );
}

export default Bag;
