
// Instead of Enums

export const CampaignStatus = {
  Active: "Active",
  Paused: "Paused",
  Ended: "Ended",
} as const

export type CampaignStatus =
  typeof CampaignStatus[keyof typeof CampaignStatus]

export const CampaignChannel = {
  Google: "Google",
  Meta: "Meta",
  LinkedIn: "LinkedIn",
  TikTok: "TikTok",
} as const

export type CampaignChannel =
  typeof CampaignChannel[keyof typeof CampaignChannel]

// Types

export type key = "spend" | "impressions" | "clicks" | "conversions"

export type Campaign = {
  id: string;
  name: string;
  channel: CampaignChannel;
  status: CampaignStatus;
  startDate: string;
  endDate: string | null;
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  budget: number;
};

export type CampaignFilters = {
  search: string;
  channels: CampaignChannel[];
  statuses: CampaignStatus[];
  startDateFrom: string | null;
  startDateTo: string | null;
};

// export type Filter = string | CampaignChannel[] | CampaignStatus[] | null

export type FilterSlice = CampaignFilters & {
  updateSearch: (search: string) => void;
  updateStatuses: (statuses: CampaignStatus[]) => void;
  updateChannels: (channels: CampaignChannel[]) => void;
  updateStartDateFrom: (startDateFrom: string | null) => void;
  updateStartDateTo: (startDateTo: string | null) => void;
  setFilters: (filters: CampaignFilters) => void;
};

export type SortDirection = "asc" | "desc";

export type CampaignSortKey = keyof Campaign | "ctr" | "cpa";

export type SortConfig = {
  key: CampaignSortKey;
  direction: SortDirection;
};

export type SortSlice = {
  sortConfig: SortConfig[];
  updateSortConfig: (sortConfig: SortConfig[]) => void
  clearSortConfig: () => void
}