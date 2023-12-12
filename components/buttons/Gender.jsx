"use client";
import { useState } from "react";

function Gender({ click }) {
  const [open, setOpen] = useState(false);

  const gender = ["men", "women", "unisex"];

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-bold uppercase text-md">Gender</h1>
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
          {gender.map((item) => (
            <div
              className="flex items-center gap-2 text-sm font-semibold"
              key={item}
            >
              <input
                type="radio"
                name="women"
                id={item}
                onClick={() => click(item)}
              />
              <label htmlFor={item} className="capitalize">
                {item}
              </label>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Gender;
