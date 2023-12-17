import Image from "next/image";
import React from "react";

function ImageCard({ image }) {
  return (
    <div className="w-full gap-2  lg:w-1/2">
      <Image
        src={image}
        alt="shoes"
        width={1000}
        height={1000}
        quality={100}
        className="rounded-[30px] fit-content"
      />
    </div>
  );
}

export default ImageCard;
