import { useFetchDataStore, useSearchStore } from "@/zustand/store";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaSort } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";

export default function SearchBar() {
  const searchTerm = useSearchStore((state) => state.term);
  const updateTerm = useSearchStore((state) => state.updateTerm);
  const sortByRarity = useSearchStore((state) => state.sortByRarity);
  const traits = useFetchDataStore((state) => state.traits);
  const toggleSortByRarity = useSearchStore(
    (state) => state.toggleSortByRarity
  );
  const [filter, setFilter] = useState(false);
  const data = useFetchDataStore((state) => state.data);
  const setData = useFetchDataStore((state) => state.setData);

  // console.log(traits);

  const handleChange = (e) => {
    const term = e.target.value;
    updateTerm(term);
  };
  const handleToggleSort = () => {
    toggleSortByRarity();
  };

  const showFilter = () => {
    setFilter(!filter);
  };
  const defaultValue = "Select a value";
  const setBase = useSearchStore((state) => state.setBase);
  const setPad1 = useSearchStore((state) => state.setPad1);
  const setPad2 = useSearchStore((state) => state.setPad2);
  const setPad3 = useSearchStore((state) => state.setPad3);
  const setWater1 = useSearchStore((state) => state.setWater1);
  const setWater2 = useSearchStore((state) => state.setWater2);
  const setAir = useSearchStore((state) => state.setAir);
  const setExotic = useSearchStore((state) => state.setExotic);

  // console.log(head, mouth, body, eye);

  const handleSelectChangeBase = (e) => {
    setBase(e.target.value);
    showFilter();
  };
  const handleSelectChangePad1 = (e) => {
    setPad1(e.target.value);
    showFilter();
  };
  const handleSelectChangePad2 = (e) => {
    setPad2(e.target.value);
    showFilter();
  };
  const handleSelectChangePad3 = (e) => {
    setPad3(e.target.value);
    showFilter();
  };
  const handleSelectChangeWater1 = (e) => {
    setWater1(e.target.value);
    showFilter();
  };
  const handleSelectChangeWater2 = (e) => {
    setWater2(e.target.value);
    showFilter();
  };
  const handleSelectChangeAir = (e) => {
    setAir(e.target.value);
    showFilter();
  };
  const handleSelectChangeExotic = (e) => {
    setExotic(e.target.value);
    showFilter();
  };

  const renderBase = () => {
    const getBase = traits.find((t) => t.name === "Base");

    return getBase?.traits?.map((v) => (
      <option key={v} value={v}>
        {v}
      </option>
    ));
    // });
  };
  const renderPad1 = () => {
    const getPad1 = traits.find((t) => t.name === "Pad 1");

    return getPad1?.traits?.map((v) => (
      <option key={v} value={v}>
        {v}
      </option>
    ));
  };
  const renderPad2 = () => {
    const getPad2 = traits.find((t) => t.name === "Pad 2");

    return getPad2?.traits?.map((v) => (
      <option key={v} value={v}>
        {v}
      </option>
    ));
  };
  const renderPad3 = () => {
    const getPad3 = traits.find((t) => t.name === "Pad 3");

    return getPad3?.traits?.map((v) => (
      <option key={v} value={v}>
        {v}
      </option>
    ));
  };
  const renderWater1 = () => {
    const getWater1 = traits.find((t) => t.name === "Water 1");

    return getWater1?.traits?.map((v) => (
      <option key={v} value={v}>
        {v}
      </option>
    ));
  };
  const renderWater2 = () => {
    const getWater2 = traits.find((t) => t.name === "Water 2");

    return getWater2?.traits?.map((v) => (
      <option key={v} value={v}>
        {v}
      </option>
    ));
  };
  const renderAir = () => {
    const getAir = traits.find((t) => t.name === "Air");

    return getAir?.traits?.map((v) => (
      <option key={v} value={v}>
        {v}
      </option>
    ));
  };
  const renderExotic = () => {
    const getExotic = traits.find((t) => t.name === "Exotic");

    return getExotic?.traits?.map((v) => (
      <option key={v} value={v}>
        {v}
      </option>
    ));
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
        className="p-2 shadow-md bg-white text-gray-500 rounded hover:scale-[0.95] duration-150 active:scale-[1.03]"
      >
        <FaSort size={28} className="" />
      </button>
      <div
        onClick={showFilter}
        className="filter cursor-pointer flex justify-center items-center p-2 shadow-md bg-white text-gray-500 rounded hover:scale-[0.95] duration-150 active:scale-[1.03]"
      >
        <FiFilter size={28} />
      </div>
      <div
        className={`${
          filter
            ? "translate-y-0  md:translate-x-0"
            : "-translate-y-full md:translate-y-0 md:translate-x-full"
        } duration-300 h-screen bg-[#44444450] backdrop-blur-sm fixed z-40 top-0 bottom-0 right-0 md:w-[50vw] w-[100vw]`}
      >
        <div className="bg-white text-primary py-10 relative">
          <div
            onClick={showFilter}
            className="cursor-pointer text-2xl fixed z-[100] right-7 top-2"
          >
            X
          </div>
          <h3 className="text-xl text-center mb-5 text-lilpadsPrimary font-medium">
            Filter By Traits
          </h3>
          <form className="pl-8 pr-8">
            <div>
              <label htmlFor="base">Base</label>
              <select onChange={handleSelectChangeBase}>
                <option value={defaultValue}>{defaultValue}</option>
                {renderBase()}
              </select>
            </div>

            <div>
              <label htmlFor="pad1">Pad 1</label>
              <select onChange={handleSelectChangePad1}>
                <option value={defaultValue}>{defaultValue}</option>
                {renderPad1()}
              </select>
            </div>

            <div>
              <label htmlFor="pad2">Pad 2</label>
              <select onChange={handleSelectChangePad2}>
                <option value={defaultValue}>{defaultValue}</option>
                {renderPad2()}
              </select>
            </div>

            <div>
              <label htmlFor="pad3">Pad 3</label>
              <select onChange={handleSelectChangePad3}>
                <option value={defaultValue}>{defaultValue}</option>
                {renderPad3()}
              </select>
            </div>
            <div>
              <label htmlFor="water1">Water 1</label>
              <select onChange={handleSelectChangeWater1}>
                <option value={defaultValue}>{defaultValue}</option>
                {renderWater1()}
              </select>
            </div>
            <div>
              <label htmlFor="water2">Water 2</label>
              <select onChange={handleSelectChangeWater2}>
                <option value={defaultValue}>{defaultValue}</option>
                {renderWater2()}
              </select>
            </div>
            <div>
              <label htmlFor="air">Air</label>
              <select onChange={handleSelectChangeAir}>
                <option value={defaultValue}>{defaultValue}</option>
                {renderAir()}
              </select>
            </div>
            <div>
              <label htmlFor="exotic">Exotic</label>
              <select onChange={handleSelectChangeExotic}>
                <option value={defaultValue}>{defaultValue}</option>
                {renderExotic()}
              </select>
            </div>
            <div className="mt-2 text-end ">
              <button
                onClick={(e) => {
                  // e.preventDefault();
                  setBase(defaultValue);
                  setPad1(defaultValue);
                  setPad2(defaultValue);
                  setPad3(defaultValue);
                  setWater1(defaultValue);
                  setWater2(defaultValue);
                  setAir(defaultValue);
                  setExotic(defaultValue);
                  setFilter(!filter);
                }}
                className="border-2 border-primary hover:bg-primary hover:text-white duration-300 px-2 rounded-md"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
