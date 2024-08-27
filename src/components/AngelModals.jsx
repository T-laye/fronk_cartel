/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Traits from "./Traits";
import { MdOutlineContentCopy } from "react-icons/md";
import Link from "next/link";

export default function AngelModals({ info, img }) {
  const [copied, setCopied] = useState(false);
  // console.log(info);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(info.id);
    setCopied(true);

    // Reset the "Copied!" message after a brief delay
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-[#00000090] backdrop-blur-sm min-h-screen flex p-4 items-center justify-center ">
      <div className="px-4 pt-4 pb-8 bg-white text-black w-full md:max-w-96  max-h-[98vh] overflow-auto hide-scroll rounded-lg ">
        <div
          className="relative
         flex flex-col items-center max-w-full"
        >
          <h3 className="text-lg">{info?.meta.name}</h3>
          <div className="w-full  my-2 rounded-lg overflow-hidden">
            <img
              src={img}
              width={500}
              height={500}
              alt={info.meta.name}
              //   priority
              loading="lazy"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-center">
            <button onClick={handleCopyClick} className=" ">
              {copied ? (
                "Copied Inscription ID!"
              ) : (
                <div className="flex items-center space-x-2">
                  {" "}
                  <MdOutlineContentCopy size={20} /> <span>copy Id</span>
                </div>
              )}
            </button>

            <p className="whitespace-wrap text-sm font-semibold break-words text-center max-w-xs mt-2 ">
              Inscription Number: {info?.inscription_number}
            </p>
            <p className="whitespace-wrap text-xs break-words text-center max-w-xs mt-2">
              Inscription ID: {info?.id}
            </p>

            {/* <marquee className="whitespace-wrap mt-1">dna: {info.dna}</marquee> */}
          </div>

          <div className="flex justify-center mt-8">
            <Link
              href={` https://magiceden.io/ordinals/item-details/${info.id}`}
              target="_blank"
              className="px-4 py-2 rounded-xl bg-gray-900 hover:scale-[0.97] active:scale-[1.01] duration-200"
            >
              <button className=" text-white">View on Magic Eden</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
