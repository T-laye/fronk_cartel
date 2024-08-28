"use client";
import LipadsCard from "@/components/ui/LipadsCard";
import SearchBar from "@/components/ui/SearchBar";
// import SearchBar from "@/components/ui/SearchBar";
import Layout from "@/Layout";
import { useFetchDataStore, useSearchStore } from "@/zustand/store";
import { useEffect, useState, useRef } from "react";

// Function to calculate trait frequency
// const calculateTraitFrequency = (data) => {
//   const traitCount = {};

//   data.forEach((item) => {
//     for (const [key, value] of Object.entries(item.attributes)) {
//       if (key === "Background") {
//         continue;
//       }

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

// // Function to calculate rarity percentage
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

// // Function to calculate total rarity of an item
// const calculateTotalRarity = (item, traitRarity) => {
//   let totalRarity = 0;

//   for (const [key, value] of Object.entries(item.attributes)) {
//     if (key !== "Background") {
//       totalRarity +=
//         traitRarity[key] && traitRarity[key][value]
//           ? parseFloat(traitRarity[key][value])
//           : 0;
//     }
//   }

//   return totalRarity;
// };

export default function Home() {
  const searchTerm = useSearchStore((state) => state.term);
  const sort = useSearchStore((state) => state.sortByRarity);
  const data = useFetchDataStore((state) => state.data);
  const sortedData = useFetchDataStore((state) => state.sortedData);
  const fetchData = useFetchDataStore((state) => state.fetchData);
  const fetchSortedData = useFetchDataStore((state) => state.fetchSortedData);
  const fetchUpdatedData = useFetchDataStore((state) => state.fetchUpdatedData);
  const setTraits = useFetchDataStore((state) => state.setTraits);
  const [currentPage, setCurrentPage] = useState(1);
  const base = useSearchStore((state) => state.base);
  const pad1 = useSearchStore((state) => state.pad1);
  const pad2 = useSearchStore((state) => state.pad2);
  const pad3 = useSearchStore((state) => state.pad3);
  const water1 = useSearchStore((state) => state.water1);
  const water2 = useSearchStore((state) => state.water2);
  const air = useSearchStore((state) => state.air);
  const exotic = useSearchStore((state) => state.exotic);
  const itemsPerPage = 100;
  const scrollContainerRef = useRef(null);

  //   console.log();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getTraits = () => {
    const attributeMap = {};

    // Iterate through each item in the data
    data?.forEach((item) => {
      const attributes = item?.attributes;

      // Iterate through each attribute of the item
      for (const [key, value] of Object?.entries(attributes)) {
        if (!attributeMap[key]) {
          // If the attribute is not yet in the map, initialize it with an empty set
          attributeMap[key] = new Set();
        }
        // Add the attribute value to the set to ensure uniqueness
        attributeMap[key].add(value);
      }
    });

    // Convert the attribute map to the desired format
    const attributesArray = Object?.entries(attributeMap).map(
      ([key, valueSet]) => ({
        name: key,
        traits: Array.from(valueSet), // Convert the set back to an array
      })
    );

    setTraits(attributesArray);
  };

  const defaultValue = "Select a value";
  const actualData = !sort ? sortedData : data;

  const filteredData = actualData?.filter((d) => {
    // Check if the name includes the search term or if searchTerm is empty
    const nameMatch =
      searchTerm === "" ||
      d.name.toLowerCase().includes(`${searchTerm.toLowerCase()}`);

    // Check if each attribute matches the filter or is set to the default value
    const baseMatch = base === defaultValue || d.attributes.Base === base;
    const pad1Match = pad1 === defaultValue || d.attributes["Pad 1"] === pad1;
    const pad2Match = pad2 === defaultValue || d.attributes["Pad 2"] === pad2;
    const pad3Match = pad3 === defaultValue || d.attributes["Pad 3"] === pad3;
    const water1Match =
      water1 === defaultValue || d.attributes["Water 1"] === water1;
    const water2Match =
      water2 === defaultValue || d.attributes["Water 2"] === water2;
    const airMatch = air === defaultValue || d.attributes.Air === air;
    const exoticMatch =
      exotic === defaultValue || d.attributes.Exotic === exotic;

    // Return true if all conditions are met
    return (
      nameMatch &&
      baseMatch &&
      pad1Match &&
      pad2Match &&
      pad3Match &&
      water1Match &&
      water2Match &&
      airMatch &&
      exoticMatch
    );
  });

  useEffect(() => {
    fetchData();
    fetchSortedData();
    fetchUpdatedData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // fetchData,
    // fetchSortedData,
    // fetchUpdatedData,
    sort,
    getTraits,
    base,
    pad1,
    pad2,
    pad3,
    water1,
    water2,
    air,
    exotic,
  ]);

  useEffect(() => {
    getTraits();
  }, [data, getTraits]);

  //   console.log(updatedData);

  // useEffect(() => {
  //   const traitCount = calculateTraitFrequency(data);
  //   const totalItems = data.length;
  //   const traitRarity = calculateRarity(traitCount, totalItems);

  //   // Calculate rarity and rank items
  //   const dataWithRarity = data.map((item) => ({
  //     ...item,
  //     totalRarity: calculateTotalRarity(item, traitRarity),
  //   }));

  //   // Sort data by rarity score
  //   const sorted = sort ? sortedData : data;

  //   // Separate exotic items from the rest
  //   const nonExoticItems = sorted.filter(
  //     (item) => item.attributes["Background"]
  //   );
  //   const exoticItems = sorted.filter((item) => item.attributes["Exotic"]);

  // Assign ranks to non-exotic items and place exotic items at the end
  //   const rankedData = nonExoticItems
  //     .map((item, index) => ({
  //       ...item,
  //       rank: index + 1,
  //     }))
  //     .concat(
  //       exoticItems.map((item) => ({
  //         ...item,
  //         rank: "Exotic",
  //       }))
  //     );

  //   setSortedData(rankedData);
  // }, [data, sort]);

  // console.log(data);

  useEffect(() => {
    const activePageButton = scrollContainerRef.current?.querySelector(
      `.snap-item[data-page="${currentPage}"]`
    );
    if (activePageButton) {
      activePageButton.scrollIntoView({
        inline: "center",
      });
    }
    window.scrollTo({ top: 0 });
  }, [currentPage]);

  //   console.log(exotic);

  const renderData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filteredData
      ?.slice(startIndex, endIndex)
      .map((d, i) => <LipadsCard key={i} data={d} index={i} />);
  };

  const filteredDataLength = filteredData.length;
  const totalPages = Math.ceil(filteredDataLength / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`px-4 py-2 mx-1 rounded snap-item ${
            i === currentPage
              ? "bg-primary text-white"
              : "bg-gray-300 text-gray-700"
          }`}
          onClick={() => handlePageClick(i)}
          data-page={i}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <Layout title="Lilpads">
      <main className="pb-20 lilpads-body">
        <div className="container mx-auto px-4">
          <h1 className="custom-font text-lilpadsPrimary text-7xl md:text-8xl text-center pt-5 md:pt-10 text-shadow">
            Lilpads
          </h1>
        </div>
        <div className="container mx-auto max-[320px]:px-2 ">
          <SearchBar />
          <div className="image-gallery mt-10">{renderData()}</div>

          {filteredData?.length > 0 ? (
            <div className="flex justify-center mt-10">
              <button
                className="px-4 py-2 mx-1 bg-primary text-white rounded"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <div
                ref={scrollContainerRef}
                className="overflow-x-scroll flex hide-scroll snap-x mx-2"
              >
                {renderPageNumbers()}
              </div>
              <button
                className="px-4 py-2 mx-1 bg-primary text-white rounded"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          ) : (
            <div className="text-center text-2xl text-black">
              No Results Found
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
