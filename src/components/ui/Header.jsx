"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosSearch } from "react-icons/io";
import { TbSortDescendingSmallBig } from "react-icons/tb";
import { useFetchDataStore, useSearchStore } from "@/zustand/store";

// const calculateTraitFrequency = (data) => {
//   const traitCount = {};

//   data.forEach((item) => {
//     for (const [key, value] of Object.entries(item.attributes)) {
//       if (!traitCount[key]) {
//         traitCount[key] = {};
//       }
//       if (!traitCount[key][value]) {
//         traitCount[key][value] = 0;
//       }
//       traitCount[key][value] += 1;
//     }
//   });

//   return traitCount;
// };

// const calculateRarity = (traitCount, totalItems) => {
//   const traitRarity = {};

//   for (const [trait, values] of Object.entries(traitCount)) {
//     traitRarity[trait] = {};
//     for (const [value, count] of Object.entries(values)) {
//       traitRarity[trait][value] = ((count / totalItems) * 100).toFixed(2);
//     }
//   }

//   return traitRarity;
// };

// // Function to add rarity score to each NFT
// const addRarityScores = (data) => {
//   const traitCount = calculateTraitFrequency(data);
//   const totalItems = data.length;
//   const traitRarity = calculateRarity(traitCount, totalItems);

//   return data.map((nft) => {
//     const rarityScore = Object.entries(nft.attributes).reduce(
//       (sum, [key, value]) => {
//         return sum + parseFloat(traitRarity[key][value]);
//       },
//       0
//     );
//     return { ...nft, rarityScore };
//   });
// };

export default function Header() {
  

  return (
    <header className="bg-primary fixed right-0 left-0 top-0 z-[10]">
      <nav className="">
        <div className="container mx-auto pt-1 pb-2.5 md:py-2 px-4 flex items-center justify-between gap-x-10 flex-wrap max-[319px]:flex-col">
          <Link href="/" className="">
            <div className="h-16 w-16 sm:h-20 sm:w-20 -ml-4">
              <Image
                height={100}
                width={100}
                src="/logo.png"
                alt="logo"
                className="h-full w-full object-contain"
              />
            </div>
          </Link>
          <div className="flex gap-5 sm:gap-10 text-lg font-medium text-white bg-green500 ">
            <div className="text-shadow">
              <Link
                target="_blank"
                href="https://doggy.market/launchpad/lilpads"
              >
                Market
              </Link>
            </div>
            <div className="text-shadow">
              <Link
                target="_blank"
                href="https://x.com/fronkcartel?s=21&t=Eck0hV8wBKHsdaJwjH9XfA"
              >
                X
              </Link>
            </div>
            <div className="text-shadow">
              <Link target="_blank" href="https://t.me/fronkcartel">
                Telegram
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
