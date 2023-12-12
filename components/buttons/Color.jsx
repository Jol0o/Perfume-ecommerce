"use client";
import React, { useState } from "react";

function Color({ click }) {
  const [open, setOpen] = useState(false);

  const color = [
    {
      color: "#4A69E2",
      name: "Tealish Blue",
    },
    {
      color: "rgb(255, 231, 155)",
      name: "Orange-Yellow",
    },
    { color: "#232321", name: "Yellow" },
    { color: "#234D41", name: "Greenish Cyan" },
    { color: "#F08155", name: "Red-Orange" },
    { color: "#000", name: "Black" },
  ];
  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-bold uppercase text-md">Colors</h1>
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
          {color.map((item, index) => {
            return (
              <button
                onClick={() => click(item.name)}
                key={index}
                className="p-5 rounded-md"
                style={{ backgroundColor: item.color }}
              ></button>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Color;
