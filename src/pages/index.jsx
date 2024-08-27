/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Layout from "@/Layout";
import Cards from "@/components/Cards";
import { gsap } from "gsap";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import { BsSortDownAlt } from "react-icons/bs";
import Image from "next/image";

export default function Home() {
  const [data, setData] = useState([]);
  const [test, setTest] = useState([]);
  const [inscriptData, setInscriptData] = useState([]);
  const [dataFilter, setDataFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsAtTime, setItemsAtTime] = useState(test);
  const [toggle, setToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState(false);
  const itemsPerPage = 100;
  const defaultValue = "Select a value";
  const [body, setBody] = useState(defaultValue);
  const [head, setHead] = useState(defaultValue);
  const [eye, setEye] = useState(defaultValue);
  const [mouth, setMouth] = useState(defaultValue);

  // console.log(head, mouth, body, eye);

  const handleSelectChangeHead = (e) => {
    setHead(e.target.value);
    showFilter();
  };
  const handleSelectChangeMouth = (e) => {
    setMouth(e.target.value);
    showFilter();
  };
  const handleSelectChangeEye = (e) => {
    setEye(e.target.value);
    showFilter();
  };
  const handleSelectChangeBody = (e) => {
    setBody(e.target.value);
    showFilter();
  };

  const showFilter = () => {
    setFilter(!filter);
  };

  const toggleSortData = () => {
    setToggle(!toggle);
  };

  // fetching data
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       if (!filter) {
  //         const response = await fetch("/assets/_metadata.json");
  //         // const r = await fetch("/sortedData.json");
  //         const jsonData = await response.json();
  //         //inscription id
  //         const res = await fetch("/fronkcartel.json");
  //         const json = await res.json();
  //         // const n = await r.json();

  //         // setTest(n);
  //         setData(jsonData);
  //         setInscriptData(json);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, [filter]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/_metadata.json");
        const r = await fetch("/sortedData.json");
        const res = await fetch("/fronkcartel.json");

        const jsonData = await response.json();
        const json = await res.json();
        const n = await r.json();

        setTest(n);
        setData(jsonData);
        setInscriptData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // console.log(inscriptData);

  // const getAttributes = data?.map((d) =>
  //   d.attributes.slice(2).map((v) => v.value)
  // );

  // const flattenedValues = getAttributes?.flat();
  // const getAllValues = getAttributes?.slice(2).map((v) => v.value);

  // function countOccurrences(arr) {
  //   const occurrences = {};

  //   // Loop through the array
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

  // const occurrencesObject = countOccurrences(flattenedValues);
  // // console.log(occurrencesObject);

  // function transformAndFillDigits(inputData, digitsData) {
  //   const result = inputData?.map((item) => {
  //     const attributesDict = {};

  //     item.attributes?.slice(2).forEach((attribute) => {
  //       const traitType = attribute?.value;
  //       const digits =
  //         digitsData[traitType] !== undefined ? digitsData[traitType] : null;

  //       attributesDict[traitType] = digits;
  //     });

  //     return {
  //       name: item.name,
  //       ...attributesDict,
  //     };
  //   });

  //   return result;
  // }

  // const transformedAndFilledData = transformAndFillDigits(
  //   data,
  //   occurrencesObject
  // );

  // function calculateTotal(data) {
  //   const result = data?.map((item) => {
  //     const values = Object.values(item);
  //     const total = values.reduce(
  //       (acc, value) => acc + (Number.isInteger(value) ? value : 0),
  //       0
  //     );

  //     return {
  //       name: item.name,
  //       total,
  //     };
  //   });

  //   return result;
  // }
  // const totalData = calculateTotal(transformedAndFilledData);

  // function calculateTotalAndSort(data) {
  //   const result = data
  //     ?.map((item) => {
  //       const values = Object.values(item);
  //       const total = values.reduce(
  //         (acc, value) => acc + (Number.isInteger(value) ? value : 0),
  //         0
  //       );

  //       return {
  //         name: item.name,
  //         total,
  //       };
  //     })
  //     .sort((a, b) => a.total - b.total);

  //   return result;
  // }

  // const sortedTotalData = calculateTotalAndSort(transformedAndFilledData);

  // const compiledArr = [];

  // const getCompiledData = () => {
  //   data?.map((d) => {
  //     const compiled = {
  //       name: "",
  //       inscriptionId: "",
  //       image: "",
  //       values: {},
  //       total: "",
  //       rank: "",
  //     };

  //     inscriptData?.map((i) => {
  //       compiled.name = d.name;
  //       compiled.image = d.image;
  //       if (i.name === compiled.name) {
  //         compiled.inscriptionId = i.inscriptionId;
  //       }
  //     });

  //     sortedTotalData?.map((s, i) => {
  //       if (s.name === d.name) {
  //         compiled.total = s.total;
  //         compiled.rank = i + 1;
  //       }
  //     });

  //     transformedAndFilledData?.map((t) => {
  //       if (t.name === d.name) {
  //         compiled.values = t;
  //       }
  //     });

  //     compiledArr.push(compiled);
  //   });
  // };

  // getCompiledData();

  // const sortedData = compiledArr?.sort((a, b) => a.rank - b.rank);
  // console.log(compiledArr);

  // const valu = compiledArr
  //   ?.sort((a, b) => a.rank - b.rank)
  //   .filter((m) => Object.keys(m.values).includes("Doofus "));
  const toggleData = [...test];

  toggleData?.sort((a, b) => {
    // Extract numbers from names
    const numberA = parseInt(a.name.match(/\d+/)[0], 10);
    const numberB = parseInt(b.name.match(/\d+/)[0], 10);

    // Compare the extracted numbers
    return numberA - numberB;
  });

  const renderData = () => {
    const dataToRender = toggle ? toggleData : test;
    const filteredData = dataToRender?.filter((d) => {
      const nameMatch = searchTerm === "" || d.name.includes(`#${searchTerm}`);
      const headMatch =
        head === defaultValue || Object.keys(d.values).includes(head);
      const bodyMatch =
        body === defaultValue || Object.keys(d.values).includes(body);
      const eyeMatch =
        eye === defaultValue || Object.keys(d.values).includes(eye);
      const mouthMatch =
        mouth === defaultValue || Object.keys(d.values).includes(mouth);

      return nameMatch && headMatch && bodyMatch && eyeMatch && mouthMatch;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    
    if (currentData && currentData.length > 0) {
      // setItemsAtTime(currentData)
      return currentData.map((d) => (
        <Cards key={d.name} info={d} rank={d.rank} />
      ));
    } else {
      return (
        <div className="text-center mt-20 text-xl">
          {currentData.length === 0 ? (
            "No results found."
          ) : (
            <div className="animate-pulse">Loading...</div>
          )}
        </div>
      );
    }
  };

  // console.log(test);

  useEffect(() => {
    renderData();
  }, [head, body, mouth, eye, searchTerm, toggle]);
  // console.log(attr);

  const traitSet = new Set();

  data?.forEach((d) => {
    d.attributes?.forEach((attribute) => {
      // Add both trait type and value to the set
      traitSet.add(`${attribute.trait_type}`);
      // valueSet.add(`${attribute.value}`);
    });
  });

  // console.log(traitSet);

  // Convert the set to an array
  const uniqueTraits = Array.from(traitSet).slice(2);
  // const uniqueValues = Array.from(valueSet);
  const getValues = (trait) => {
    const valueSet = new Set();
    data?.forEach((d) => {
      d.attributes?.forEach((attribute) => {
        if (attribute.trait_type.slice(2).toLowerCase() === trait) {
          valueSet.add(`${attribute.value}`);
        }
      });
    });
    return valueSet;
  };

  // console.log(getValues("body"));

  // const renderSelect = () => {
  //   return uniqueTraits?.map((t) => {
  //     const trait_values = getValues(t.slice(2).toLowerCase());
  //     // console.log(t);

  //     //  console.log(`Trait: ${t.slice(2)}, Values: ${Array.from(trait_values)}`);

  //     return (
  //       <div key={t}>
  //         <label htmlFor={t}>{t.slice(1)}</label>
  //         <select onChange={handleSelectChange}>
  //           <option value="">Select Value</option>
  //           {Array.from(trait_values)?.map((v) => (
  //             <option key={v} value={v}>
  //               {v}
  //             </option>
  //           ))}
  //         </select>
  //       </div>
  //     );
  //   });
  // };
  const renderBody = () => {
    // return uniqueTraits?.map((t) => {
    const trait_values = getValues("body");

    return Array.from(trait_values)?.map((v) => (
      <option key={v} value={v}>
        {v}
      </option>
    ));
    // });
  };
  const renderHead = () => {
    // return uniqueTraits?.map((t) => {
    const trait_values = getValues("head");
    return Array.from(trait_values)?.map((v) => (
      <option key={v} value={v}>
        {v}
      </option>
    ));
    // });
  };
  const renderEye = () => {
    // return uniqueTraits?.map((t) => {
    const trait_values = getValues("eye");
    return Array.from(trait_values)?.map((v) => (
      <option key={v} value={v}>
        {v}
      </option>
    ));
    // });
  };
  const renderMouth = () => {
    // return uniqueTraits?.map((t) => {
    const trait_values = getValues("mouth");
    return Array.from(trait_values)?.map((v) => (
      <option key={v} value={v}>
        {v}
      </option>
    ));
    // });
  };

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(test.length / itemsPerPage);
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`${
            currentPage === i ? "bg-[#111]" : "bg-[#]"
          } border p-4 w-5 h-5 text-white justify-center items-center flex rounded-md`}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  useEffect(() => {
    // Scroll to the top of the page when the page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    const reveal = gsap.fromTo(
      "input, h2, .filter, .logo",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
        stagger: 0.1,
      }
    );
    return () => {
      reveal.kill();
    };
  }, []);

  return (
    <Layout title="Rarity" className={` bg-primary`}>
      <div className="container mx-auto ">
        <section>
          <div className="logo bg-blue-00 flex justify-center w-full mt-3 md:mt-7 px-3  ">
            {/* <img
              src={`/assets/logo/fronkcartellogo2.png`}
              width={500}
              height={500}
              alt="logo"
              // priority
              className="w-full lg:w-2/3 h-full object-contain"
            /> */}
            
            <h1 className="whitespace-nowrap text-[170%] md:text-6xl ">Fronk Cartel</h1>
          </div>
          <div className="flex flex-col justify-center mt-3 items-center px-4 ">
            <h2 className="text-xl text-center mt-0 mb-5">
              Search NFT rarity by number
            </h2>
            <div className="w-full relative flex space-x-2">
              <input
                type="text"
                placeholder="Type Number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute top-3 right-28 text-primary ">
                <AiOutlineSearch size={28} />
              </div>
              <div
                onClick={showFilter}
                className="filter shadow-lg cursor-pointer flex justify-center items-center h-12 rounded-md bg-white text-primary w-12"
              >
                <FiFilter size={24} />
              </div>
              <div
                onClick={toggleSortData}
                className="filter shadow-lg cursor-pointer flex justify-center items-center h-12 rounded-md bg-white text-primary w-12"
              >
                <BsSortDownAlt size={24} />
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20">
          {test?.length > 0 ? (
            <>
              <div className="image-gallery mt-10">{renderData()}</div>
              <div>
                <div className="flex items-center justify-between mt-14 mb-2 px-3">
                  <div className="arr"> &larr; </div>
                  <div> &rarr; </div>
                </div>
                <div className="flex justify-start items-center px-3 space-x-5 overflow-x-scroll pb-4 hide-scroll">
                  {renderPaginationButtons()}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center mt-20 text-xl">
              {searchTerm ? (
                "No results found."
              ) : (
                <div className="animate-pulse">Loading...</div>
              )}
            </div>
          )}
        </section>

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
            <h3 className="text-xl text-center mb-5 text-primary font-medium">
              Filter By Traits
            </h3>
            <form className="pl-8 pr-8">
              <div>
                <label htmlFor="body">Body</label>
                <select onChange={handleSelectChangeBody}>
                  <option value={defaultValue}>{defaultValue}</option>
                  {renderBody()}
                </select>
              </div>

              <div>
                <label htmlFor="head">Head</label>
                <select onChange={handleSelectChangeHead}>
                  <option value={defaultValue}>{defaultValue}</option>
                  {renderHead()}
                </select>
              </div>

              <div>
                <label htmlFor="mouth">Mouth</label>
                <select onChange={handleSelectChangeMouth}>
                  <option value={defaultValue}>{defaultValue}</option>
                  {renderMouth()}
                </select>
              </div>

              <div>
                <label htmlFor="eye">Eye</label>
                <select onChange={handleSelectChangeEye}>
                  <option value={defaultValue}>{defaultValue}</option>
                  {renderEye()}
                </select>
              </div>
              <div className="mt-2 text-end ">
                <button
                  onClick={(e) => {
                    // e.preventDefault();
                    setHead(defaultValue);
                    setEye(defaultValue);
                    setMouth(defaultValue);
                    setBody(defaultValue);
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
    </Layout>
  );
}
