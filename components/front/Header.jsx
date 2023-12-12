import React from "react";
import Image from "next/image";

function Header() {
  return (
    <div className="w-full min-h-[60vh] p-2">
      <div className="container h-full m-auto bg-center">
        <div className="max-h-[265px] mb-10">
          <Image
            src="https://res.cloudinary.com/dkibnftac/image/upload/v1685250177/Do_it_right_eudnw5.png"
            alt="doit"
            height={100}
            width={1000}
            className="w-full h-full"
          />
        </div>
        <div className="relative bg-[url('https://res.cloudinary.com/dkibnftac/image/upload/v1685250137/image_14_wqlfmk.png')] min-h-[700px] bg-no-repeat bg-cover rounded-[5%] bg-center">
          <div className="absolute rotate-90 rounded-t-md p-4 font-semibold bg-gray-800 top-32 left-[-4.8rem] text-[#FAFAFA]">
            Nike product of the year
          </div>
          <div className="flex justify-between items-end absolute bottom-0 w-full min-h-[300px] p-5 md:p-10 text-[#FAFAFA]">
            <div className="flex flex-col items-start gap-3 md:max-w-[400px]">
              <h1 className="text-[30px] md:text-[50px] font-bold uppercase">
                nike air max
              </h1>
              <p className="text-sm md:text-xl">
                Nike introducing the new air max for everyone's comfort
              </p>
              <button className="px-4 py-1 text-sm font-semibold uppercase bg-blue-500 rounded-md md:px-6 md:py-3">
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
