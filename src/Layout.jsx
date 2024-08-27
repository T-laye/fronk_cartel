import Head from "next/head";
import Header from "./components/Header";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Layout({ title, children }) {
  const router = useRouter();
  const [data, setData] = useState();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(
  //         "https://api.doggy.market/inscriptions/200f4906b7de297de779002f29189e10574d99c514cd4ab30fd626516ef47b52i0"
  //       );

  //       const json = await res.json();

  //       setData(json);
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, [data]);

  const favicon = () => {
    if (router.pathname === "/devs") {
      return "/assets/images/25.png";
    } else if (router.pathname === "/d9monz") {
      return "/assets/logo/demon_logo.jpeg";
    } else if (router.pathname === "/8ngels") {
      return "/assets/logo/angel_logo.jpeg";
    } else if (router.pathname === "/eggclipse") {
      return "https://api.doggy.market/inscriptions/5474163b4168c4df634b47fba421ec0642de6eebaf54d6e112b8d50f187f3563i0/content";
    } else {
      return "/assets/9901.png";
    }
  };
  // console.log(router.pathname);
  const bg = () => {
    if (router.pathname === "/devs") {
      return "bg-gray-500";
    } else if (router.pathname === "/d9monz") {
      return "black-bg";
      // console.log('demons');
    } else if (router.pathname === "") {
      return "bg-primary";
    } else if (router.pathname === "/8ngels") {
      return "bg-white";
    } else if (router.pathname === "/eggclipse") {
      return "egg-bg";
    } else if (router.pathname === "/lilpads") {
      return "bg-white";
    }
  };

  return (
    <>
      <Head>
        <title>{title ? `${title} | Fronk-Cartel` : "Fronk-Cartel"}</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={favicon()} />
        {/* <link rel="stylesheet" href="" /> */}
      </Head>
      <Header />
      <main className={`min-h-screen ${bg()} `}>{children}</main>
    </>
  );
}
