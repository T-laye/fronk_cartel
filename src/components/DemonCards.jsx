/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import DevModal from "./DevModals";
import { MdOutlineContentCopy } from "react-icons/md";
import DemonModals from "./DemonModals";
// import pic from "../../public/assets/images/300.png";

export default function DemonCards({ info }) {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef(null);
  // const [digit, setDigit] = useState("");

  // function replaceSpacesAndHash(inputString) {
  //   return inputString.replace(/ /g, "%20").replace(/#/g, "_");
  // }

  const imageName = info.image;

  const show = () => {
    setShowModal(!showModal);

    // console.log(showModal);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(info.inscriptionId);
    setCopied(true);

    // Reset the "Copied!" message after a brief delay
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  

  useEffect(() => {
    const reveal = gsap.fromTo(
      ".demoncards",
      { opacity: 0, translateY: 20 },
      {
        opacity: 1,
        translateY: 0,
        duration: 2,
        ease: "elastic.out(1, 0.4)",
        stagger: 0.1,
      }
    );
    return () => {
      reveal.kill();
    };
  }, []);
  return (
    <>
      <div
        ref={cardRef}
        className="demoncards overflow-hidden opacity-0 cursor-pointer"
      >
        <div className="flex items-center justify-center">
          <p className="text-gray-700 w-11/12  font-bold  py-1 text-sm text-center">
            {info.name}
          </p>
        </div>
        <div onClick={show} className="overflow-hidden">
          <img
            // src={`https://ik.imagekit.io/ebmc7qv63/demons/Demon%20_986.png?updatedAt=1710800504904`}
            src={`https://ik.imagekit.io/ebmc7qv63/demons/${imageName}`}
            width={500}
            height={500}
            alt={info.name}
            //   priority
            loading="lazy"
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <div className="flex justify-end items-center px-3">
            <p className="text-gray-700 font-bold px-2 py-2 text-sm text-center">
              {copied ? "" : "Copy ID"}
            </p>
            <div onClick={handleCopyClick} className="text-gray-700 ">
              {copied ? (
                <div className="text-gray-700">Copied</div>
              ) : (
                <div className="flex items-center text-gray-700 ">
                  {" "}
                  <MdOutlineContentCopy fill="#374151" size={20} />
                  {/* <span>copy Id</span> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <>
          <div
            onClick={show}
            className="cursor-pointer text-3xl fixed z-[100] right-5 top-5"
          >
            X
          </div>
          <DemonModals
            info={info}
            img={`https://ik.imagekit.io/ebmc7qv63/demons/${imageName}`}
          />
        </>
      )}
    </>
  );
}
