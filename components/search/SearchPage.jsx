import React from "react";
import Image from "next/image";
import Link from "next/link";

function SearchPage({ result, error }) {
  return (
    <div className="container flex flex-wrap items-center justify-center gap-3 m-auto md:justify-start">
      {result.length > 0 ? (
        result.map((item) => (
          <div key={item.id}>
            <Link href={`/product/${item.id}`}>
              <Image
                src={item.imageUrl}
                alt={item.name}
                height={500}
                width={500}
                className="rounded-md max-h-[500px] h-[100%] object-fit"
              />
              <div className="flex justify-between mt-3 text-lg font-semibold">
                <div>
                  <h1
                    className={`text-xl font-medium ${
                      item.genderType === "women"
                        ? "text-pink-700"
                        : "text-[#4A69E2]"
                    } capitalize`}
                  >
                    {item.name}
                  </h1>
                  <p
                    className={`text-sm font-medium ${
                      item.genderType === "women"
                        ? "text-pink-500"
                        : "text-[#4A69E2]"
                    } capitalize`}
                  >
                    {item.genderType}
                  </p>
                </div>
                <div>
                  <p>PHP {item.price.toLocaleString()}</p>
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center w-full text-xl font-bold uppercase">
          <h1>{error}</h1>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
