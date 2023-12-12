import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  UserIcon,
  Cog6ToothIcon,
  HeartIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";

const solutions = [
  {
    name: "Profile",
    icon: UserIcon,
    href: "Profile",
  },
  {
    name: "Favorite",
    icon: HeartIcon,
    href: "/favorite",
  },
  {
    name: "Settings",
    icon: Cog6ToothIcon,
    href: "Settings",
  },
];

export default function Profile() {
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center text-sm font-semibold leading-6 text-gray-900 gap-x-1">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 flex w-screen px-4 mt-5 -translate-x-1/2 left- max-w-max">
          <div className="flex-auto w-screen max-w-[300px] overflow-hidden text-sm leading-6 bg-white shadow-lg rounded-3xl ring-1 ring-gray-900/5">
            <div className="p-4">
              {solutions.map((item) => (
                <div
                  key={item.name}
                  className="relative flex items-center p-4 rounded-lg group gap-x-6 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-center flex-none mt-1 rounded-lg h-11 w-11 bg-gray-50 group-hover:bg-white">
                    <item.icon
                      className="w-6 h-6 text-gray-600 group-hover:text-indigo-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <Link
                      href={item.href}
                      className="font-semibold text-gray-900"
                    >
                      {item.name}
                      <span className="absolute inset-0" />
                    </Link>
                  </div>
                </div>
              ))}
              <div className="relative flex items-center p-4 rounded-lg group gap-x-6 hover:bg-gray-50">
                <div className="flex items-center justify-center flex-none mt-1 rounded-lg h-11 w-11 bg-gray-50 group-hover:bg-white">
                  <ArrowLeftOnRectangleIcon
                    className="w-6 h-6 text-gray-600 group-hover:text-indigo-600"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <button
                    onClick={logout}
                    className="font-semibold text-gray-900"
                  >
                    Logout
                    <span className="absolute inset-0" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
