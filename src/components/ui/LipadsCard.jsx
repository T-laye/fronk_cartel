/* eslint-disable @next/next/no-img-element */
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Modal from "./LilpadsModal";
import { MdOutlineContentCopy } from "react-icons/md";
import { useFetchDataStore, useSearchStore } from "@/zustand/store";

export default function LipadsCard({ data, index }) {
  const [showModal, setShowModal] = useState(false);
  const sort = useSearchStore((state) => state.sortByRarity);
  const sortedData = useFetchDataStore((state) => state.sortedData);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef(null);
  // const image = `/images/${data?.inscriptionId}`;

  function convertToUrlWithUnderscore(imageName) {
    if (!imageName) return "";

    // Replace spaces with %20
    let encodedName = imageName.replace(/ /g, "%20");

    // Add an underscore '_' if the character following '%20' is a number
    encodedName = encodedName.replace(/%20(\d)/g, "%20_$1");

    // Construct the full URL
    const baseUrl = "https://ik.imagekit.io/ygybmhi6q/Lilpads/";
    return `${baseUrl}${encodedName}`;
  }

  const image = convertToUrlWithUnderscore(data?.inscriptionId);

  // console.log(image);

  const show = () => {
    setShowModal(!showModal);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(data.inscriptionId);
    setCopied(true);

    // Reset the "Copied!" message after a brief delay
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const getRank = sortedData.find((d) => d.name === data.name);
  // console.log(getRank);

  useEffect(() => {
    const reveal = gsap.fromTo(
      ".lil-cards",
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

  // console.log(data);

  return (
    <>
      <div
        ref={cardRef}
        className="lil-cards overflow-hidden opacity-0 cursor-pointer bg-white rounded-xl flex flex-col justify-end"
      >
        <div className="flex items-center justify-center whitespace-nowrap">
          <p className="text-primary w-11/12 font-bold py-1 text-sm text-center">
            {data.name}
          </p>
        </div>
        <div onClick={show} className="w-full h-full overflow-hidden">
          <img
            height={200}
            width={200}
            alt="Image"
            src={image}
            quality={80}
            loading="lazy"
            className="w-full h-full object-cover hover:scale-105 duration-150"
          />
        </div>
        <div>
          <div className="flex justify-center items-center px-3">
            <p className="text-primary font-bold px-2 py-2 text-sm text-center whitespace-nowrap">
              {/* {rank?.name.includes("Lilpad") ? `Rank ${rank?.rank}` : "Exotic"} */}
              {getRank?.rank === "Exotic" ? "Exotic" : `Rank ${getRank?.rank}`}
            </p>
          </div>
        </div>
      </div>
      {showModal && (
        <>
          <div
            onClick={show}
            className="cursor-pointer text-3xl fixed z-[100] right-5 top-5 text-white"
          >
            X
          </div>
          <Modal info={data} img={image} />
        </>
      )}
    </>
  );
}
