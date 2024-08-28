import axios from "axios";
import { create } from "zustand";

export const useSearchStore = create((set) => ({
  term: "",
  base: "Select a value",
  pad1: "Select a value",
  pad2: "Select a value",
  pad3: "Select a value",
  water1: "Select a value",
  water2: "Select a value",
  air: "Select a value",
  exotic: "Select a value",
  updateTerm: (newTerm) => set({ term: newTerm }),
  setBase: (base) => set({ base }),
  setPad1: (pad1) => set({ pad1 }),
  setPad2: (pad2) => set({ pad2 }),
  setPad3: (pad3) => set({ pad3 }),
  setWater1: (water1) => set({ water1 }),
  setWater2: (water2) => set({ water2 }),
  setAir: (air) => set({ air }),
  setExotic: (exotic) => set({ exotic }),
  sortByRarity: false,
  toggleSortByRarity: () =>
    set((state) => ({ sortByRarity: !state.sortByRarity })),
}));

export const useFetchDataStore = create((set) => ({
  data: [],
  sortedData: [],
  rankedData: [],
  updatedData: [],
  traits: [],
  fetchData: async () => {
    const res = await axios.get("/data/finaljson.json");
    set((state) => ({ data: res.data }));
  },
  fetchSortedData: async () => {
    const res = await axios.get("/data/sortedData.json");
    set((state) => ({ sortedData: res.data }));
  },
  fetchUpdatedData: async () => {
    const res = await axios.get("/data/lilpads.json");
    set((state) => ({ updatedData: res.data }));
  },
  setData: (newData) => set({ sortedData: newData }),
  setRankData: (rankedData) => set({ rankedData }),
  setTraits: (traits) => set({ traits }),
}));
