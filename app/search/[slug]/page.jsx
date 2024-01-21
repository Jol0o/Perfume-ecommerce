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
  const [products, setProducts] = useState([]);

  const getSearch = () => {
    if (products) {
      const filteredData = products.filter((item) => {
        return (
          item.name.toLowerCase().includes(decodedSlug.toLowerCase()) ||
          item.genderType.toLowerCase().includes(decodedSlug.toLowerCase()) ||
          item.description.toLowerCase().includes(decodedSlug.toLowerCase())
        );
      });
      setResult(filteredData);
      if (filteredData.length === 0) {
        setError("No result found");
      }
    }
  };


  useEffect(() => {
    getSearch();
  }, [products, decodedSlug]);

  const getProducts = async () => {
    try {
      const productCollectionRef = collection(db, "perfume");
      const data = await getDocs(productCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <SearchPage result={result} error={error} />
    </>
  );
}

export default page;
