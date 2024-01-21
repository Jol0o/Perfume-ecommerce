"use client";
import { auth, db } from "@/firebase/config";
import { useUserStore } from "@/zustand/store";
import { collection, getDoc, getDocs, setDoc, doc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

function Items() {
  const [product, setProduct] = useState([]);
  const productCollectionRef = collection(db, "perfume");
  const router = useRouter();

  const getProduct = async () => {
    try {
      const data = await getDocs(productCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProduct(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const addToCart = async (product) => {
    if (!auth.currentUser) {
      // router.push("login");
    } else {
      const uid = auth.currentUser.uid;
      const userRef = doc(db, "cart", uid);
      try {
        const userSnap = await getDoc(userRef);
        const cart = [];
        if (userSnap.exists()) {
          const userData = userSnap.data();
          cart.push(...userData.cart);
        }
        const productIndex = cart.findIndex((item) => item.id === product.id);
        if (productIndex === -1) {
          // Add the product to the cart with a quantity of 1
          cart.push({ ...product, quantity: 1 });
        } else {
          // Increase the quantity of the product in the cart by 1
          cart[productIndex].quantity += 1;
        }
        await setDoc(userRef, { cart });
        updateCart(cart);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="grid items-center justify-center w-full grid-cols-1 gap-2 sm:grid-cols-2 md: place-items-center lg:grid-cols-3">
      {product.map((item, index) => {
        return (
          <div key={index}>
            <Link href={`/product/${item.id}`}>
              <Image
                src={item.imageUrl}
                alt={item.name}
                height={1000}
                width={1000}
                className="rounded-md min-h-[400px]"
              />
              <h1 className="mt-2 text-xl font-semibold"> {item.name}</h1>
              <p className="text-sm font-normal text-gray-600">
                {item.category}
              </p>
              <p className="mb-2 font-bold text-md">
                PHP{item.price.toLocaleString()}
              </p>
            </Link>
            <button
              onClick={() => addToCart(item)}
              className="bg-[#232321] py-3  font-semibold text-sm rounded-md uppercase text-[#fafafa] w-[100%]"
            >
              Add To Cart
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Items;
