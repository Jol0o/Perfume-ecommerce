"use client";
import React, { useState } from "react";

function Refine({ refine, click }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-bold uppercase text-md">Refine By</h1>
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
        <div className="flex gap-2 mt-2 ">
          <button
            onClick={() => click("men")}
            className="bg-indigo-500 text-[#fafafa] font-semibold py-1 px-3 rounded-md"
          >
            Mens
          </button>
          <button
            onClick={() => click("casual")}
            className="bg-indigo-500 text-[#fafafa] font-semibold py-1 px-3 rounded-md"
          >
            Casual
          </button>
        </div>
      )}
    </>
  );
}

export default Refine;
