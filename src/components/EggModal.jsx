/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import Traits from "./Traits";
import { MdOutlineContentCopy } from "react-icons/md";
import Link from "next/link";

export default function EggModal({ info, img }) {
  const [copied, setCopied] = useState(false);
  // console.log(info);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(info.inscriptionId);
    setCopied(true);

    // Reset the "Copied!" message after a brief delay
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-[#00000090] backdrop-blur-sm min-h-screen flex p-4 items-center justify-center ">
      <div className="px-4 pt-4 pb-8 bg-amber-950 w-full md:max-w-96  max-h-[98vh] overflow-auto hide-scroll rounded-lg ">
        <div
          className="relative
         flex flex-col items-center max-w-full"
        >
          <h3 className="text-lg">{info?.name}</h3>
          <div className="w-full  my-2 rounded-lg overflow-hidden">
            <img
              src={img}
              width={500}
              height={500}
              alt={info.name}
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

            <p className="whitespace-wrap text-xs break-words text-center max-w-xs ">
              Inscription ID: {info?.inscriptionId}
            </p>

            {/* <marquee className="whitespace-wrap mt-1">dna: {info.dna}</marquee> */}
          </div>

          <div className="flex justify-center mt-8">
            <Link
              href={`https://doggy.market/inscription/${info.inscriptionId}`}
              target="_blank"
            >
              <button className="btn text-black">View on Doggy</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
