"use client";
import { db, auth } from "@/firebase/config";
import { collection, doc, getDocs, setDoc , getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function FrontCards() {
  const [product, setProduct] = useState([]);
  const productCollectionRef = collection(db, "perfume");
  const route = useRouter();

  useEffect(() => {
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      localStorage.setItem("uid", uid);
    }
  }, []);

  useEffect(() => {
    if (!auth.currentUser) return;
    const setUserDoc = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);
        if (!docSnap.exists()) {
          await setDoc(userRef, {
            email: user?.email,
            name: user?.displayName,
            uid: user?.uid,
            img: user?.photoURL,
            // Add any other user data you want to store
          });
        }
      }
    };
    setUserDoc();
  }, []);
  
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
  return (
    <div className="w-full p-2 my-10 md:p-0">
      <div className="container min-h-[30vh] m-auto">
        {/* <div className="flex items-center justify-between md:items-end">
          <h1 className="text-[25px] sm:text-[30px] md:text-[75px] md:w-[650px] sm:w-[300px] font-bold leading-none uppercase w-[200px]">
            Don't miss out new drops
          </h1>
	@@ -40,36 +46,69 @@ function FrontCards() {
          >
            Show More
          </button>
        </div> */}
        <div></div>
        <h1 className="text-2xl font-bold">Women's Perfume</h1>
        <div className="grid items-center justify-center w-full gap-2 grid-cols-[repeat(auto-fill,minmax(160px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] place-items-center md:gap-4">
          {product
            .filter((item) => item.genderType === "women")
            .map((item) => {
              return (
                <Link href={`/product/${item.id}`} key={item.id}>
                  <div className="max-h-[300px] h-full mt-3 md:mt-0 md:min-h-[500px] sm:w-[clamp(50px,100%,300px)] md:w-[310px] w-[clamp(30px,100%,200px)] flex flex-col items-center justify-center">
                    <div className="relative w-full rounded-lg h-1/2 ">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        height={1000}
                        width={1000}
                        className="object-contain rounded-lg md:max-h-[350px] max-h-[180px] h-full"
                      />
                    </div>
                    <div className="flex flex-col w-[clamp(100px,100%,300px)] my-4 ">
                      <h1 className="text-[clamp(20px, 5vw , 30px)] truncate overflow-hidden  justify-self-center font-bold ">
                        {item.name}
                      </h1>
                      <button className="bg-[#232321] truncate overflow-hidden rounded-md md:py-3 md:text-md text-[#FAFAFA] py-2 px-3 text-sm font-semibold">
                        {item.price.toLocaleString()}
                        <span className="text-orange-400 "> PHP</span>
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
        <h1 className="text-2xl font-bold">Men's Perfume</h1>
        <div className="grid items-center justify-center w-full gap-2 my-5 grid-cols-[repeat(auto-fill,minmax(160px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] place-items-center  md:gap-4">
          {product
            .filter((item) => item.genderType === "men")
            .map((item) => {
              return (
                <Link href={`/product/${item.id}`} key={item.name}>
                  <div className="max-h-[300px] h-full mt-3 md:mt-0 md:min-h-[500px] sm:w-[clamp(50px,100%,300px)] md:w-[310px] w-[clamp(30px,100%,200px)] flex flex-col items-center justify-center">
                    <div className="relative w-full rounded-lg h-1/2 ">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        height={1000}
                        width={1000}
                        className="object-contain rounded-lg md:max-h-[350px] max-h-[180px] h-full"
                      />
                    </div>
                    <div className="flex flex-col w-[clamp(100px,100%,300px)] my-4 ">
                      <h1 className="text-[clamp(20px, 5vw , 30px)] truncate overflow-hidden  justify-self-center font-bold ">
                        {item.name}
                      </h1>
                      <button className="bg-[#232321] truncate overflow-hidden rounded-md md:py-3 md:text-md text-[#FAFAFA] py-2 px-3 text-sm font-semibold">
                        {item.price.toLocaleString()}
                        <span className="text-orange-400 "> PHP</span>
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default FrontCards;
