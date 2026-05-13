import { create } from "zustand";
import type { StateCreator } from "zustand";
import type { Campaign, CampaignChannel, CampaignFilters, CampaignStatus, FilterSlice, SortConfig, SortSlice, VisibleCampaignsSlice } from "../types";

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
  setFilters: (filters: CampaignFilters) => set({
  search: filters.search,
  statuses: filters.statuses,
  channels: filters.channels,
  startDateFrom: filters.startDateFrom,
  startDateTo: filters.startDateTo,
  })
});


export const sortSlice: StateCreator<SortSlice> = (set) => ({
  sortConfig: [],
  updateSortConfig: (sortConfig: SortConfig[]) => set({ sortConfig }),
  clearSortConfig: () => set({ sortConfig: [] })
})

export const visibleCampaignsSlice: StateCreator<VisibleCampaignsSlice> = (set) => ({
  visibleCampaigns: [] as Campaign[],
  selectedCampaignIndex: null,
  updateVisibleCampaigns: (visibleCampaigns: Campaign[]) => set({ visibleCampaigns }),
  setSelectedCampaignIndex: (selectedCampaignIndex: number | null) => set({selectedCampaignIndex}),
});

//SETTING STORE

type CampaignStore = FilterSlice & SortSlice & VisibleCampaignsSlice;

export const useCampaignStore = create<CampaignStore>()((...a) => ({
  ...filterSlice(...a),
  ...sortSlice(...a),
  ...visibleCampaignsSlice(...a),
}));




