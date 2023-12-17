"use client";
import { auth } from "@/firebase/config";
import { useUserStore } from "@/zustand/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Profile from "./../buttons/Profile";

function Navbar() {
  const [user] = useAuthState(auth);
  const { cart } = useUserStore((state) => state);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const submit = (e) => {
    e.preventDefault();
    if (!setOpen) {
      setOpen(true);
    }
    if (search) {
      router.push(`/search/${search}`);
    } else {
      return;
    }
  };

  return (
    <div className="w-full my-10">
      <div className="container px-2 md:px-10 min-h-[70px] m-auto bg-[#FAFAFA] flex justify-between items-center rounded-md">
        <a href="/">
          <Image
            src={"/logo/icon.png"}
            alt={"Crafting Aromatics"}
            height={50}
            width={50}
            className="object-contain rounded-lg md:max-h-[350px] max-h-[180px] h-full"
          />
        </a>
        <ul className="flex items-center justify-center gap-5">
          <li className="flex items-center justify-center">
            <input
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className={`${
                open ? "w-38 p-2 border" : "w-0"
              } outline-none  ease-out duration-300 capitalize  rounded-md mr-2`}
            />
            <button
              onClick={submit}
              onMouseEnter={() => setOpen(!open)}
              className="self-center"
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
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </li>
          <li>
            {user ? (
              <Profile />
            ) : (
              <Link href="/login">
                <button className="px-3 py-1 font-bold text-white uppercase bg-pink-700 rounded-md">
                  Sign up
                </button>
              </Link>
            )}
          </li>
          {user && (
            <Link href="/cart">
              <li className="px-3 py-1 bg-orange-400 rounded-full">
                {cart.length}
              </li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
