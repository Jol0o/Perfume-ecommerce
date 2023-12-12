"use client";
import React, { useState } from "react";

function Categories({ click }) {
  const [open, setOpen] = useState(false);

  const categories = ["casual", "runner", "hiking", "sneaker", "basketball"];
  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-bold uppercase text-md">Category</h1>
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
          {categories.map((item) => {
            return (
              <div
                key={item}
                className="flex items-center gap-2 text-sm font-semibold"
              >
                <input
                  type="radio"
                  name="radio"
                  id="radio"
                  className="w-5 h-5"
                  onClick={() => click(item)}
                />
                <label htmlFor="radio" className="capitalize">
                  {item}
                </label>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Categories;
