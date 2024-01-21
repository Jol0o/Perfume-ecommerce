"use client";
import { Fragment, useState } from "react";
import { Popover, Transition, Dialog } from "@headlessui/react";
import {
  UserIcon,
  Cog6ToothIcon,
  HeartIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { auth, db } from "@/firebase/config";
import { signOut, updateProfile } from "firebase/auth";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, updateDoc } from "firebase/firestore";

export default function Profile() {
  const [open, setOpen] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [newName, setNewName] = useState("");

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSave = async () => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, {
      img: newImage,
      name: newName,
    });
    updateProfile(auth.currentUser, {
      displayName: newName,
      photoURL: newName,
    })
      .then(() => {
        setOpen(!open);
        toast.success("Profile Updated!", {
          position: "top-right",
        });
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(false);
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
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
                <div className="relative flex items-center p-4 rounded-lg group gap-x-6 hover:bg-gray-50">
                  <div className="flex items-center justify-center flex-none mt-1 rounded-lg h-11 w-11 bg-gray-50 group-hover:bg-white">
                    <UserIcon
                      className="w-6 h-6 text-gray-600 group-hover:text-indigo-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <button
                      onClick={handleOpen}
                      className="font-semibold text-gray-900"
                    >
                      Edit Profile
                      <span className="absolute inset-0" />
                    </button>
                  </div>
                </div>
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
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setOpen(!open)}
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Edit Profile
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="New Name"
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    onChange={(e) => setNewName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="New Image URL"
                    className="w-full px-3 py-2 mt-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    onChange={(e) => setNewImage(e.target.value)}
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-pink-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={handleSave}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
