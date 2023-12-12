"use client";
import React, { useState } from "react";

function Range({ click }) {
  const [open, setOpen] = useState(false);
  const [rangeValue, setRangeValue] = useState(50);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-bold uppercase text-md">Price</h1>
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
        <div className="flex flex-col w-full gap-3 mt-2">
          <input
            className="p-2 border border-gray-400 rounded-sm outline-none"
            type="number"
            placeholder="Min & Max"
            onChange={(e) => click(e.target.value)}
          />
        </div>
      )}
    </>
  );
}

export default Range;
