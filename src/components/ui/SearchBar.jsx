import { useFetchDataStore, useSearchStore } from "@/zustand/store";
import React from "react";
import { IoIosSearch } from "react-icons/io";
import { FaSort } from "react-icons/fa";

export default function SearchBar() {
  const searchTerm = useSearchStore((state) => state.term);
  const updateTerm = useSearchStore((state) => state.updateTerm);
  const sortByRarity = useSearchStore((state) => state.sortByRarity);
  const rankedData = useFetchDataStore((state) => state.rankedData);
  const toggleSortByRarity = useSearchStore(
    (state) => state.toggleSortByRarity
  );

  const data = useFetchDataStore((state) => state.data);
  const setData = useFetchDataStore((state) => state.setData);

  const handleChange = (e) => {
    const term = e.target.value;
    updateTerm(term);
  };
  const handleToggleSort = () => {
    toggleSortByRarity();
  };

  return (
    <div className="flex gap-2 max-lg:w-full mt-10 items-center px-4 ">
      <div className="w-full flex justify-center relative lg:bgred-400 z-[9]">
        <input
          type="text"
          placeholder="Search Nft"
          value={searchTerm}
          onChange={handleChange}
          className="p-2 rounded border lil-input text-black"
        />
        <IoIosSearch
          size={24}
          className="absolute top-2 right-2 text-gray-500 z-[9] "
        />
      </div>
      <button
        onClick={handleToggleSort}
        className="p-2 bg-white text-gray-500 rounded hover:scale-[0.95] duration-150 active:scale-[1.03]"
      >
        <FaSort size={28} />
      </button>
    </div>
  );
}
