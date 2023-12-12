import React from "react";

function Club() {
  return (
    <div className="w-[700px] bg-[#FAFAFA] p-5 rounded-xl mt-5">
      <h1 className="text-[clamp(20px,4vw,35px)] font-bold mb-3">
        Join Kicks Club Get Rewarded Today.
      </h1>
      <p className="mb-2 font-medium text-gray-600 text-md">
        As kicks club member you get rewarded with what you love for doing what
        you love. Sign up today and receive immediate access to these Level 1
        benefits:
      </p>
      <ul className="mb-2 font-medium text-gray-600 list-disc mx-7 text-md">
        <li>Free shipping​</li>
        <li>A 15% off voucher for your next purchase​</li>
        <li>Access to Members Only products and sales​</li>
        <li>Access to adidas Running and Training apps​</li>
      </ul>
      <p className="my-3 font-medium text-gray-600 text-md">
        Join now to start earning points, reach new levels and unlock more
        rewards and benefits from adiClub.​
      </p>
      <button className="flex text-[#fafafa] uppercase font-bold mt-10 justify-between p-3 bg-[#232321] w-full">
        Join the club
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
          />
        </svg>
      </button>
    </div>
  );
}

export default Club;
