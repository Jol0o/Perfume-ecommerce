"use client";
import React, { useState, useEffect } from "react";
import Sizes from "./../buttons/Sizes";
import Color from "./../buttons/Color";
import Categories from "./../buttons/Category";
import Gender from "./../buttons/Gender";
import Range from "./../buttons/Range";
import { db } from "@/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useUserStore } from "@/zustand/store";

function Filter() {
  const { updateFilter, filter } = useUserStore((state) => state);
  const [refine, setRefine] = useState();
  const [size, setSize] = useState(0);
  const [color, setColor] = useState();
  const [category, setCategory] = useState();
  const [gender, setGender] = useState();
  const [range, setRange] = useState(0);

  const clear = () => {
    setSize(0);
    setColor(undefined);
    setCategory(undefined);
    setGender(undefined);
    setRange(0);
  };
  const filters = async () => {
    try {
      let q = collection(db, "products");
      if (size !== 0) {
        q = query(q, where("size", "==", size));
      }
      if (color !== undefined) {
        q = query(q, where("color", "array-contains", color));
      }
      if (category !== undefined) {
        q = query(q, where("category", "==", category));
      }
      if (gender !== undefined) {
        q = query(q, where("gender", "==", gender));
      }
      if (range !== 0) {
        q = query(q, where("price", "<=", range));
      }
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size > 0) {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        updateFilter(data);
      }
    } catch (error) {
      console.error("Error searching for products:", error);
    }
  };

  useEffect(() => {
    filters();
  }, [size, color, category, gender, range]);

  return (
    <div className="w-[clamp(100px,50%,400px)] p-2 hidden md:flex flex-col gap-3">
      <div className="text-2xl font-bold">Filters</div>
      <div className="flex-col gap-3 md:flex">
        <div>
          <Sizes refine={size} click={setSize} />
        </div>
        <div>
          <Color refine={color} click={setColor} />
        </div>
        <div>
          <Categories refine={category} click={setCategory} />
        </div>
        <div>
          <Gender refine={gender} click={setGender} />
        </div>
        <div>
          <Range refine={range} click={setRange} />
        </div>
        <button
          onClick={clear}
          className="bg-[#4A69E2] p-3 font-bold uppercase tracking-wide text-[#fff] rounded-md"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Filter;
