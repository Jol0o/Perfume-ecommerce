"use client";
import React, { useState } from "react";

function Sizes({ click, refine }) {
  const [open, setOpen] = useState(false);

  const size = [38, 39, 40, 41, 42, 43, 44, 45, 46];
  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-bold uppercase text-md">Sizes</h1>
        <button onClick={() => setOpen(!open)}>
          {open ? (
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
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          ) : (
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
          )}
        </button>
      </div>
      {open && (
        <div className="flex flex-wrap w-full gap-3 mt-2">
          {size.map((item) => {
            return (
              <button
                key={item}
                onClick={() => click(item)}
                className="active:bg-[#232321] active:text-[#fafafa] font-semibold bg-[#fafafa] p-5 rounded-md"
              >
                {item}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Sizes;
