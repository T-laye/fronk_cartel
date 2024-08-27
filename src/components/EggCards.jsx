/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { MdOutlineContentCopy } from "react-icons/md";
import AngelModals from "./AngelModals";
import EggModal from "./EggModal";
// import pic from "../../public/assets/images/300.png";

export default function EggCards({ info }) {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef(null);

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
      ".eggcards",
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
        className="eggcards text-amber-950 overflow-hidden opacity-0 cursor-pointer"
      >
        <div className="flex items-center justify-center">
          <p className=" w-11/12  font-bold  py-1 text-lg text-center">
            {info.name}
          </p>
        </div>
        <div onClick={show} className="overflow-hidden">
          <img
            src={`https://api.doggy.market/inscriptions/${info.inscriptionId}/content`}
            width={500}
            height={500}
            alt={info.name}
            //   priority
            loading="lazy"
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <div className="flex justify-between items-center px-2">
            <p className=" font-bold px-2 py-2 text-sm text-center">
              {copied ? "" : "Copy Id"}
            </p>
            <div onClick={handleCopyClick} className="text-amber-950 ">
              {copied ? (
                <div className="">Copied</div>
              ) : (
                <div className="flex items-center  ">
                  {" "}
                  <MdOutlineContentCopy  size={20} />
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
          <EggModal
            info={info}
            img={`https://api.doggy.market/inscriptions/${info.inscriptionId}/content`}
          />
        </>
      )}
    </>
  );
}
