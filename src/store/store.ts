import { create } from "zustand";
import type { StateCreator } from "zustand";
import type { CampaignChannel, CampaignStatus, FilterSlice } from "../types";

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


export const useCampaignStore = create<FilterSlice>()((...a) => ({
  ...filterSlice(...a),
}));


