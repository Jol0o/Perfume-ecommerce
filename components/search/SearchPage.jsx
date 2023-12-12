import React from "react";
import Image from "next/image";
import Link from "next/link";

function SearchPage({ result, error }) {
  console.log(result, error);
  return (
    <div className="container flex flex-wrap items-center justify-center gap-3 m-auto md:justify-start">
      {result &&
        result.map((item) => (
          <div key={item.id}>
            <Link href={`/product/${item.id}`}>
              <Image
                src={item.image[0]}
                alt={item.name}
                height={500}
                width={500}
                className="rounded-md min-h-[500px] object-fit"
              />
              <div className="flex justify-between mt-3 text-lg font-semibold">
                <div>
                  <h1>{item.name}</h1>
                  <p className="text-sm font-normal">{item.category}</p>
                </div>
                <div>
                  <p>PHP {item.price.toLocaleString()}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default SearchPage;
