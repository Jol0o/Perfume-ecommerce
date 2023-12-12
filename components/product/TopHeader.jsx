import Image from "next/image";
import React from "react";

function TopHeader() {
  return (
    <div className="w-full rounded-[30px] h-[250px] md:min-h-[400px]  flex items-center px-5 md:px-10 text-[#fafafa] relative">
      <div className="z-20 flex flex-col justify-center w-[clamp(150px,60%,500px)] min-h-full ">
        <p className="text-[15px] md:text-[24px] font-medium">
          Limited time only
        </p>
        <h1 className="text-[30px] md:text-[74px] font-bold">Get 30% off</h1>
        <p className="text-sm font-thin md:text-lg drop-shadow-lg">
          Sneakers made with your comfort in mind so you can put all of your
          focus into your next session.
        </p>
      </div>
      <Image
        src="/bg/cover.png"
        alt="cover"
        fill
        quality={100}
        className="rounded-[30px] z-0"
      />
    </div>
  );
}

export default TopHeader;
