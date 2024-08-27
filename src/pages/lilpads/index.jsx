"use client";
import LipadsCard from "@/components/ui/LipadsCard";
import SearchBar from "@/components/ui/SearchBar";
// import SearchBar from "@/components/ui/SearchBar";
import Layout from "@/Layout";
import { useFetchDataStore, useSearchStore } from "@/zustand/store";
import { useEffect, useState, useRef } from "react";

// Function to calculate trait frequency
const calculateTraitFrequency = (data) => {
  const traitCount = {};

  data.forEach((item) => {
    for (const [key, value] of Object.entries(item.attributes)) {
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

// Function to calculate rarity percentage
const calculateRarity = (traitCount, totalItems) => {
  const traitRarity = {};

  for (const [trait, values] of Object.entries(traitCount)) {
    traitRarity[trait] = {};
    for (const [value, count] of Object.entries(values)) {
      traitRarity[trait][value] = ((count / totalItems) * 100).toFixed(2);
    }
  }

  return traitRarity;
};

// Function to calculate total rarity of an item
const calculateTotalRarity = (item, traitRarity) => {
  let totalRarity = 0;

  for (const [key, value] of Object.entries(item.attributes)) {
    if (key !== "Background") {
      totalRarity +=
        traitRarity[key] && traitRarity[key][value]
          ? parseFloat(traitRarity[key][value])
          : 0;
    }
  }

  return totalRarity;
};

export default function Home() {
  const searchTerm = useSearchStore((state) => state.term);
  const sort = useSearchStore((state) => state.sortByRarity);
  const data = useFetchDataStore((state) => state.data);
  const sortedData = useFetchDataStore((state) => state.sortedData);
  const fetchData = useFetchDataStore((state) => state.fetchData);
  const fetchSortedData = useFetchDataStore((state) => state.fetchSortedData);
  const [currentPage, setCurrentPage] = useState(1);
  // const [sortedData, setSortedData] = useState([]);
  const itemsPerPage = 100;
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    fetchData();
    fetchSortedData();
  }, [fetchData, fetchSortedData, sort]);

  // console.log(data);

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

  const actualData = !sort ? sortedData : data;

  const filteredData = searchTerm
    ? actualData.filter((d) =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : actualData;

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
            <div className="text-center text-2xl">No Results Found</div>
          )}
        </div>
      </main>
    </Layout>
  );
}
