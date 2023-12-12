import React from "react";
import Image from "next/image";
import { FaTiktok } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";

function Footer() {
  return (
    <div className="flex flex-col justify-between w-full px-2 py-10">
      <div className="container m-auto bg-[#4A69E2] min-h-[80vh] rounded-[30px]">
        <div className="flex flex-wrap items-center justify-between gap-5 p-10">
          <div className="w-full md:w-[500px]">
            <h1 className="text-[48px] font-semibold uppercase leading-tight font-mono text-[#FAFAFA]">
              Join our KicksPlus Club & get 15% off
            </h1>
            <p className="my-3 font-semibold text-gray-300 text-md">
              Sign up for free! Join the community.
            </p>
            <div>
              <input
                className="px-3 py-1 bg-transparent border border-gray-300 rounded-md min-w-72"
                type="text"
                placeholder="Email address"
              />
              <button
                type="submit"
                className="bg-[#232321] text-[#FAFAFA] font-semibold uppercase text-xs py-2 px-3 rounded-md h-9 ml-1"
              >
                Submit
              </button>
            </div>
          </div>
          <div className="flex justify-center w-1/2">
            <Image src="/logo/Group2.png" alt="log2" width={300} height={300} />
          </div>
        </div>
        <div className="w-full relative flex-col md:flex-row bg-[#232321] rounded-b-[30px] min-h-[70vh] md:min-h-[55vh] text-[#FAFAFA] flex gap-5 md:justify-between p-5">
          <div className="max-w-[400px]">
            <h1 className="text-2xl font-bold text-orange-400 ">About us</h1>
            <p className="text-sm font-medium">
              We are the biggest hyperstore in the universe. We got you all
              cover with our exclusive collections and latest drops.
            </p>
          </div>
          <div>
            <h1 className="text-lg font-bold text-orange-400 ">Categories</h1>
            <ul className="flex flex-col gap-2 text-sm font-medium">
              <li>Runners</li>
              <li>Sneakers</li>
              <li>Basketball</li>
              <li>Outdoor</li>
              <li>Golf</li>
              <li>Hiking</li>
            </ul>
          </div>
          <div>
            <h1 className="text-lg font-bold text-orange-400 ">Company</h1>
            <ul className="flex flex-col gap-2 text-sm font-medium">
              <li>About</li>
              <li>Contact</li>
              <li>Blogs</li>
            </ul>
          </div>
          <div>
            <h1 className="text-lg font-bold text-orange-400 ">Follow us</h1>
            <ul className="flex items-center gap-2 mt-2 text-lg">
              <li>
                <FaTiktok />
              </li>
              <li>
                <FiGithub />
              </li>
              <li>
                <AiOutlineFacebook />
              </li>
              <li>
                <AiOutlineInstagram />
              </li>
            </ul>
          </div>
          <div className="absolute bottom-0 left-1 ">
            <Image
              src="/logo/Group1.png"
              alt="logo"
              width={1500}
              height={1500}
              className="rounded-b-[30px] bg-[#232321]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
