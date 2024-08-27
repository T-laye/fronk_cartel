/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Modal from "./Modal";
import { MdOutlineContentCopy } from "react-icons/md";
// import pic from "../../public/assets/images/300.png";

export default function Cards({ info, rank }) {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef(null);
  const [digit, setDigit] = useState("");

  const imageName = info.name;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getNumber = () => {
    const match = imageName.match(/\d+/);
    if (match) {
      const extractedNumber = parseInt(match[0], 10);
      setDigit(extractedNumber);
    } else {
      console.log("No number found in the name.");
    }
  };

  useEffect(() => {
    getNumber();
  }, [getNumber]);

  const image =
    digit <= 5000
      ? `https://ik.imagekit.io/Cartel/1/${digit}.png`
      : `https://ik.imagekit.io/Cartel/2/${digit}.png`;

  const show = () => {
    setShowModal(!showModal);
  };

  // console.log(info);

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
      ".cards",
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
        className="cards overflow-hidden opacity-0 cursor-pointer"
      >
        <div className="flex items-center justify-center">
          <p className="text-primary w-11/12  font-bold  py-1 text-sm text-center">
            {info.name}
          </p>
        </div>
        <div onClick={show} className="overflow-hidden">
          <img
            src={image}
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
            <p className="text-primary font-bold px-2 py-2 text-sm text-center">
              Rank {rank}
            </p>
            <div onClick={handleCopyClick} className="text-primary ">
              {copied ? (
                <div className="text-primary">Copied</div>
              ) : (
                <div className="flex items-center text-primary ">
                  {" "}
                  <MdOutlineContentCopy fill="#1e6f50" size={20} />
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
          <Modal info={info} img={image} />
        </>
      )}
    </>
  );
}
