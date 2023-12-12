"use client";

import React, { useState, useEffect } from "react";
import { auth, db } from "@/firebase/config";
import { collection, getDoc, getDocs, doc } from "firebase/firestore";
import Image from "next/image";

function Favorites() {
  const [favorite, setFavorite] = useState([]);

  const productCollectionRef = collection(db, "favorites");
  const getProduct = async () => {
    try {
      const data = await getDocs(productCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFavorite(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProduct();
    console.log(favorite);
  }, []);

  return (
    <>
      {favorite && (
        <div className="container flex m-auto">
          {favorite.map((item) => (
            <div key={item}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-medium">{}</h2>
                  <p className="font-thin text-md">{}</p>
                </div>
                <div>
                  <p className="text-xl font-medium">PHP {}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Favorites;
