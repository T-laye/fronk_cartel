import axios from "axios";
import { create } from "zustand";

export const useSearchStore = create((set) => ({
  term: "",
  updateTerm: (newTerm) => set({ term: newTerm }),
  sortByRarity: false,
  toggleSortByRarity: () =>
    set((state) => ({ sortByRarity: !state.sortByRarity })),
}));

export const useFetchDataStore = create((set) => ({
  data: [],
  sortedData: [],
  rankedData: [],
  updatedData: [],
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
}));
