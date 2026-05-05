import { create } from "zustand";
import type { StateCreator } from "zustand";
import type { Campaign, CampaignChannel, CampaignStatus, FilterSlice, SortConfig, SortSlice } from "../types";

// SETTING SLICES

export const filterSlice: StateCreator<FilterSlice> = (set) => ({
  search: "",
  statuses: [] as CampaignStatus[],
  channels: [] as CampaignChannel[],
  startDateFrom: null,
  startDateTo: null,

  updateSearch: (search: string) => set({ search }),
  updateStatuses: (statuses: CampaignStatus[]) => set({ statuses }),
  updateChannels: (channels: CampaignChannel[]) => set({ channels }),
  updateStartDateFrom: (startDateFrom: string | null) => set({ startDateFrom }),
  updateStartDateTo: (startDateTo: string | null) => set({ startDateTo }),
});


export const sortSlice: StateCreator<SortSlice> = (set) => ({
  sortConfig: [],
  updateSortConfig: (sortConfig: SortConfig<Campaign>[]) => set({ sortConfig }),
  clearSortConfig: () => set({ sortConfig: [] })
})

//SETTING STORE

type CampaignStore = FilterSlice & SortSlice;

export const useCampaignStore = create<CampaignStore>()((...a) => ({
  ...filterSlice(...a),
  ...sortSlice(...a),
}));



