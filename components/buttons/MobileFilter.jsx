"use client";
import React, { useState } from "react";
import Sizes from "./Sizes";
import Refine from "@/components/buttons/Refine";
import Color from "./Color";
import Categories from "./Category";
import Gender from "./Gender";
import Range from "./Range";

function MobileFilter() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative block md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex text-sm bg-[#F4F2F2] py-2 px-2 items-center justify-between w-36 font-semibold uppercase rounded-md"
      >
        Filter{" "}
        <span>
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
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </button>
      {open && (
        <div className="absolute flex-col w-[clamp(350px,80%,500px)] p-2 right-0 bg-[#F4F2F2] gap-5 rounded-md md:flex">
          <Refine />
          <div className="my-2">
            <Sizes />
          </div>
          <div className="mb-2">
            <Color />
          </div>
          <div className="mb-2">
            <Categories />
          </div>
          <div className="mb-2">
            <Gender />
          </div>
          <div className="mb-2">
            <Range />
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileFilter;
