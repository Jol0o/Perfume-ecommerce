"use client";

import React, { useState, useEffect } from "react";
import ImageCard from "../../../components/product/ImageCard";
import DetailCard from "../../../components/product/DetailCard";
import { db } from "@/firebase/config";
import { collection, doc, getDoc } from "firebase/firestore";
import { useUserStore } from "@/zustand/store";

function page({ params }) {
  const { updateProduct } = useUserStore((state) => state);
  const { id } = params;

  const [products, setProduct] = useState("");

  const getProductById = async () => {
    const productDocRef = doc(collection(db, "perfume"), id);
    const productDoc = await getDoc(productDocRef);
    if (productDoc.exists()) {
      setProduct(productDoc.data());
      updateProduct(productDoc.data());
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getProductById();
  }, []);

  return (
    <>
      {products && (
        <div className="w-full min-h-[100vh] p-2">
          <div className="container flex flex-wrap h-full gap-10 m-auto">
            <ImageCard image={products.imageUrl} />
            <DetailCard details={products} />
          </div>
        </div>
      )}
    </>
  );
}
export default page;
