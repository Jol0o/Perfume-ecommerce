"use client";
import React from "react";
import Image from "next/image";
import Club from "./Club";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "@/firebase/config";
import { useUserStore } from "@/zustand/store";

function Login() {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateUser } = useUserStore((state) => state);
  const router = useRouter();

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err) {
      setIsError(true);
      setError(err.toString());
    }
  };

  const loginGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (err) {
      setIsError(true);
      setError(err.toString());
    }
  };

  const fbLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (err) {
      setIsError(true);
      setError(err.toString());
    }
  };

  return (
    <div className="w-full">
      <div className="container flex flex-wrap p-2 m-auto justify-evenly">
        <div className="w-[500px] flex flex-col gap-2">
          <div>
            <h1 className="text-3xl font-bold text-[#232321]">Login</h1>
            <p className="text-sm font-semibold my-1 text-[#232321b9]">
              Forgat your password?
            </p>
          </div>
          <form className="flex flex-col gap-3">
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="bg-transparent border border-[#232321] rounded-md p-2"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="bg-transparent border border-[#232321] rounded-md p-2"
            />
            <div className="flex items-center gap-2 my-2">
              <input
                type="checkbox"
                name="remember"
                id="check"
                className="h-10"
              />
              <label htmlFor="check" className="font-medium text-md">
                Keep me logged in - applies to all log in options below. More
                info
              </label>
            </div>
            <button
              onClick={login}
              className="flex bg-[#232321] justify-between py-2 uppercase px-3 rounded-md text-[#fafafa] font-bold text-sm items-center"
            >
              Email Login{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </button>
          </form>
          <div className="flex gap-2 mt-2">
            <button
              onClick={loginGoogle}
              className="h-16 flex items-center justify-center w-[30%] border border-[#232321] rounded-md"
            >
              <Image
                src="/icon/pngegg1.png"
                alt="icon"
                width={100}
                height={50}
                className="w-10"
              />
            </button>
            <button
              onClick={fbLogin}
              className="h-16 flex items-center justify-center w-[30%] border border-[#232321] rounded-md"
            >
              <Image
                src="/icon/pngegg2.png"
                alt="icon"
                width={100}
                height={100}
                className="w-10"
              />
            </button>
            <button className="h-16 flex items-center justify-center w-[30%] border border-[#232321] rounded-md">
              <Image
                src="/icon/pngegg3.png"
                alt="icon"
                width={100}
                height={100}
                className="w-10"
              />
            </button>
          </div>
          <div className="mt-2">
            <p className="text-sm font-semibold text-gray-600 text-medium">
              By clicking 'Log In' you agree to our website KicksClub Terms &
              Conditions, Kicks Privacy Notice and Terms & Conditions.
            </p>
          </div>
        </div>
        <Club />
      </div>
    </div>
  );
}

export default Login;
