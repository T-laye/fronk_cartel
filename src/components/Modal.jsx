/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Traits from "./Traits";
import { MdOutlineContentCopy } from "react-icons/md";
import Link from "next/link";

export default function Modal({ info, img }) {
  const [data, setData] = useState(null);
  const [allData, setAllData] = useState(null);
  const [ins, setIns] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(info.inscriptionId);
    setCopied(true);

    // Reset the "Copied!" message after a brief delay
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  // // const values = info.attributes.slice(2).map((a) => a.value);

  // const allValues = allData?.map((d) =>
  //   d.attributes.slice(2).flatMap((a) => a.value)
  // );

  // const flattenedValues = allValues?.flat();
  // // console.log(flattenedValues.length);

  // function countOccurrences(arr) {
  //   const occurrences = {};

  // Loop through the array
  //   arr?.forEach((element) => {
  //     // If the element is already in the occurrences object, increment its count
  //     if (occurrences[element]) {
  //       occurrences[element]++;
  //     } else {
  //       // If the element is not in the occurrences object, initialize its count to 1
  //       occurrences[element] = 1;
  //     }
  //   });

  //   return occurrences;
  // }

  // // Example usage:
  // // const myArray = [1, 2, 3, 1, 2, 1, 4, 5, 4];
  // const occurrencesObject = countOccurrences(flattenedValues);

  // // Get the keys of the object as an array
  // // const keysArray = Object.keys(occurrencesObject);

  // // // Get the length of the array (which represents the number of keys in the object)
  // // const numberOfKeys = keysArray.length;

  // // console.log(occurrencesObject);
  // // console.log(values);

  // const occurrencesOfValues = {};

  // // Loop through the elements in the values array
  // values.forEach((value) => {
  //   // Check if the value exists in the occurrencesObject
  //   if (occurrencesObject.hasOwnProperty(value)) {
  //     // Retrieve the occurrence count and store it in occurrencesOfValues
  //     occurrencesOfValues[value] = occurrencesObject[value];
  //   } else {
  //     // If the value is not in occurrencesObject, set its occurrence count to 0 or handle accordingly
  //     occurrencesOfValues[value] = 0;
  //   }
  // });

  // let totalOccurrences = 0;

  // // Loop through the elements in the values array
  // values.forEach((value) => {
  //   // Check if the value exists in the occurrencesObject
  //   if (occurrencesObject.hasOwnProperty(value)) {
  //     // Accumulate the occurrence count to the total
  //     totalOccurrences += occurrencesObject[value];
  //   }
  // });

  // console.log(totalOccurrences);

  // console.log(occurrencesOfValues);

  const traits = ["Body", "Mouth", "Head", "Eye"];
  // console.log(info.values);

  const renderTraits = () => {
    // return traits.map((m) => {
    return Object.entries(info.values).map(([key, value]) => {
      if (key !== "name") {
        return (
          <Traits key={key} trait={key} value={value} total={info.total} />
        );
      }
    });
    // });
    // const tri = traits.map((t) => t);

    // console.log(enter, tri);
  };
  // renderTraits();
  // const renderTraits = () => {
  //   return info?.map((a, i) => {
  //     // Use logical AND (&&) instead of OR (||) in the condition
  //     if (
  //       a.trait_type.toLowerCase() !== "1 background" &&
  //       a.trait_type.toLowerCase() !== "2 base"
  //     ) {
  //       return <Traits key={i} trait={a.trait_type.slice(1)} value={a.value} />;
  //     }
  //     return null; // Return null if the condition is not met
  //   });
  // };

  // useEffect(() => {
  //   const fetchInscription = async () => {
  //     try {
  //       const response = await fetch("/fronkcartel.json");
  //       const jsonData = await response.json();
  //       setData(jsonData);
  //       const res = await fetch("/_metadata.json");
  //       const json = await res.json();
  //       setAllData(json);
  //       // console.log(jsonData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchInscription();
  // }, []);

  // useEffect(() => {
  //   const renderInscription = () => {
  //     return data?.map((d) => {
  //       if (d.name === info.name) {
  //         setIns(d.inscriptionId);
  //       }
  //     });
  //   };

  //   renderInscription();
  // }, [data, info.name]);
  return (
    <div className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-[#00000090] backdrop-blur-sm min-h-screen flex p-4 items-center justify-center ">
      <div className="px-4 pt-4 pb-8 bg-green-900 w-full md:max-w-md  max-h-[98vh] overflow-auto hide-scroll rounded-lg ">
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
            <marquee className="whitespace-wrap">
              Inscription ID: {info.inscriptionId}
            </marquee>
            {/* <marquee className="whitespace-wrap mt-1">dna: {info.dna}</marquee> */}
          </div>
        </div>

        <div className="bg-primary mt-5 rounded-lg pt-1 pb-1 px-3">
          <h3 className="text-lg text-center mt-2 ">Attributes</h3>
          <div>
            <div className="flex justify-between text-lg mb-1">
              <div className="flex-1 text-cente ">Trait Type</div>
              <div className="text-end flex-1">Value</div>
            </div>
            {renderTraits()}
            {/* <Traits trait="Rarity" value={totalOccurrences} /> */}
          </div>
        </div>
        {/* https://doggy.market/inscription/inscription id */}
        <div className="flex justify-center mt-8">
          <Link
            href={`https://doggy.market/inscription/${info.inscriptionId}`}
            target="_blank"
          >
            <button className="btn text-primary">View on Doggy</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
