import React from "react";
import Image from "next/image";

function Header() {
  return (
    <div className="w-full min-h-[60vh] p-2">
      <div className="container h-full m-auto bg-center">
        <div className="relative bg-[url('https://i.pinimg.com/originals/e9/ae/c3/e9aec3db9d45ced0699b0b0143f7bc55.jpg')] min-h-[700px] bg-no-repeat bg-cover rounded-[5%] bg-center">
          <div className="absolute rotate-90 rounded-t-md p-4 font-semibold bg-pink-700 top-32 left-[-5.5rem] text-[#FAFAFA]">
            Perfume product of the year
          </div>
          <div className="flex justify-between items-end absolute bottom-0 w-full min-h-[300px] p-5 md:p-10 text-[#FAFAFA]">
            <div className="flex flex-col items-start gap-3 md:max-w-[400px]">
              <h1 className="text-[30px] md:text-[50px] font-bold uppercase text-pink-700">
                Perfume
              </h1>
              <p className="text-sm text-pink-700 md:text-xl">
                Nike introducing the new air max for everyone's comfort
              </p>
              <button className="px-4 py-1 text-sm font-semibold uppercase bg-pink-700 rounded-md md:px-6 md:py-3">
                Shop now
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <Image
                src="/bg/Rectangle2.png"
                alt="1"
                width={100}
                height={100}
              />
              <Image
                src="/bg/Rectangle1.png"
                alt="1"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
