/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Traits from "./Traits";
import { MdOutlineContentCopy } from "react-icons/md";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useFetchDataStore } from "@/zustand/store";

export default function Modal({ info, img }) {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const data = useFetchDataStore((state) => state.data);
  const fetchData = useFetchDataStore((state) => state.fetchData);

  function replaceSpacesAndNumbers(str) {
    return str?.replace("%20%$1", " ").replace("%20", " ");
  }

  const originalString = info?.name;
  const updatedString = replaceSpacesAndNumbers(originalString);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(info.inscriptionId);
    setCopied(true);

    // Reset the "Copied!" message after a brief delay
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const nft = data?.find((d) => d.name === updatedString);

  //   console.log(data);

  // Function to calculate the frequency of each trait across all NFTs
  const calculateTraitFrequency = (data) => {
    const traitCount = {};

    data.forEach((item) => {
      for (const [key, value] of Object.entries(item.attributes)) {
        // Skip counting the 'Background' trait
        if (key === "Background") {
          continue;
        }

        if (!traitCount[key]) {
          traitCount[key] = {};
        }
        if (!traitCount[key][value]) {
          traitCount[key][value] = 0;
        }
        traitCount[key][value] += 1;
      }
    });

    return traitCount;
  };

  // Function to calculate rarity percentage of each trait value
  const calculateRarity = (traitCount, totalItems) => {
    const traitRarity = {};

    for (const [trait, values] of Object.entries(traitCount)) {
      traitRarity[trait] = {};
      for (const [value, count] of Object.entries(values)) {
        traitRarity[trait][value] = ((count / totalItems) * 100).toFixed(2); // Calculate rarity percentage
      }
    }

    return traitRarity;
  };

  // Calculate trait frequencies and rarities
  const traitCount = calculateTraitFrequency(data);
  const totalItems = data.length;
  const traitRarity = calculateRarity(traitCount, totalItems);

//   console.log(traitRarity);

  // Calculate the total sum of rarity percentages for this NFT's traits
  const totalRaritySum = nft.attributes
    ? Object.entries(nft.attributes).reduce((sum, [key, value]) => {
        if (key !== "Background") {
          // Ensure `traitRarity[key]` and `traitRarity[key][value]` exist
          return (
            sum +
            (traitRarity[key] && traitRarity[key][value]
              ? parseFloat(traitRarity[key][value])
              : 0)
          );
        }
        return sum;
      }, 0)
    : 0;

//   console.log(totalRaritySum);

  return (
    <div className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-[#00000090] backdrop-blur-sm min-h-screen flex p-4 items-center justify-center ">
      <div className="px-4 pt-4 pb-8 bg-white w-full md:max-w-md  max-h-[98vh] overflow-auto hide-scroll rounded-lg ">
        <div
          className="relative
         flex flex-col items-center max-w-full"
        >
          <h3 className="text-lg">{info?.name}</h3>
          <div className="w-1/2  my-2 rounded-lg overflow-hidden">
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
            {/* <button onClick={handleCopyClick} className=" ">
              {copied ? (
                "Copied Inscription ID!"
              ) : (
                <div className="flex items-center space-x-2">
                  {" "}
                  <MdOutlineContentCopy size={20} /> <span>copy Id</span>
                </div>
              )}
            </button> */}
            {/* <marquee className="whitespace-wrap">
              Inscription ID: {info.inscriptionId}
            </marquee> */}
            {/* <marquee className="whitespace-wrap mt-1">dna: {info.dna}</marquee> */}
          </div>
        </div>

        <div className="bg-primary mt-5 rounded-lg pt-1 pb-1 px-3 text-white">
          <h3 className="text-lg text-center mt-2 ">Attributes</h3>
          <div>
            <div className="flex justify-between text-lg mb-1">
              <div className="flex-1 text-cente ">Trait Type</div>
              <div className="text-end flex-1">Value</div>
            </div>
            {nft?.attributes &&
              Object.entries(nft.attributes)
                // Filter out the 'Background' key to exclude it from rendering
                .filter(([key, value]) => key !== "Background")
                .map(([key, value]) => (
                  <div key={key}>
                    {/* <div className="font-bold">
          <span>{key}</span>
        </div> */}
                    <div className="flex justify-between max-lg:text-center text-xl">
                      <span>{value}</span>
                      <span>
                        {/* Check if traitRarity[key] exists and has a value for the current attribute */}
                        {traitRarity[key] && traitRarity[key][value]
                          ? `${traitRarity[key][value]}%`
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                ))}

            <div className="font-bold    flex justify-between sm:mt-4 border-t pt-2">
              <span>Rarity</span>
              <span>{totalRaritySum.toFixed(2)}</span>
            </div>
          </div>
        </div>
        {/* https://doggy.market/inscription/inscription id */}
        {/* <div className="flex justify-center mt-8">
          <Link
            href={`https://doggy.market/inscription/${info.inscriptionId}`}
            target="_blank"
          >
            <button className="btn text-primary">View on Doggy</button>
          </Link>
        </div> */}
      </div>
    </div>
  );
}
