"use client";
import { db } from "@/firebase/config";
import React, { useEffect, useState } from "react";
import SearchPage from "./../../../components/search/SearchPage";
import { collection, where, getDocs, doc, query } from "firebase/firestore";

function page({ params }) {
  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug);
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");

  const getSearchResults = async () => {
    try {
      const searchRef = collection(db, "products");
      const q = query(searchRef, where("name", ">=", decodedSlug)); // Use query() function to create a query
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size > 0) {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setResult(data);
      } else {
        setError("No results found");
      }
    } catch (error) {
      console.error("Error searching for products:", error);
      setError("An error occurred while searching for products.");
    }
  };

  useEffect(() => {
    getSearchResults();
  }, [slug]);

  return (
    <>
      <SearchPage result={result} error={error} />
    </>
  );
}

export default page;
