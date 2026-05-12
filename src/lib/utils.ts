import { useCampaignStore } from "../store/store";
import type {
  Campaign,
  CampaignChannel,
  CampaignFilters,
  CampaignSortKey,
  CampaignStatus,
  key,
  SortConfig,
} from "../types";

// *******************
// GENERAL Functions
// *******************

export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function rowInteractionColor(status: CampaignStatus) {
  if (status === "Ended") {
    return "hover:bg-red-200 focus-visible:bg-red-200";
  }

  if (status === "Active") {
    return "hover:bg-green-200 focus-visible:bg-green-200";
  }

  return "hover:bg-yellow-50 focus-visible:bg-yellow-50";
}

export function formatNumber(num: number): string {
  if (num < 1_000) {
    return num.toString();
  }

  if (num < 1_000_000) {
    return (num / 1000).toFixed(1) + "k";
  }

  return (num / 1_000_000).toFixed(1) + "M";
}

export function noSortsOrFilters(filters: CampaignFilters, sortConfig: SortConfig[]) {
  const noFilters =
    !filters.search &&
    filters.channels.length === 0 &&
    filters.statuses.length === 0 &&
    !filters.startDateFrom &&
    !filters.startDateTo;
  const noSorts = sortConfig.length === 0;
  return noFilters && noSorts
}

// ********************
// FILTER LOGIC
// ********************

export function filterByChannel(
  campaigns: Campaign[],
  channels: CampaignChannel[],
): Campaign[] {
  if (channels.length === 0) return campaigns;
  return campaigns.filter((campaign) => channels.includes(campaign.channel));
}

export function filterByStatus(
  campaigns: Campaign[],
  statuses: CampaignStatus[],
): Campaign[] {
  if (statuses.length === 0) return campaigns;
  return campaigns.filter((campaign) => statuses.includes(campaign.status));
}

export function filterBySearch(
  campaigns: Campaign[],
  search: string,
): Campaign[] {
  const cleanSearch = search.toLowerCase().trim();
  if (!cleanSearch) return campaigns;
  return campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(cleanSearch),
  );
}

export function filterByDateRange(
  campaigns: Campaign[],
  startDateFrom: string | null,
  startDateTo: string | null,
): Campaign[] {
  if (startDateTo && !startDateFrom) {
    return campaigns.filter((campaign) => campaign.startDate <= startDateTo);
  } else if (startDateFrom && !startDateTo) {
    return campaigns.filter((campaign) => campaign.startDate >= startDateFrom);
  } else if (startDateFrom && startDateTo) {
    return campaigns.filter(
      (campaign) =>
        campaign.startDate >= startDateFrom &&
        campaign.startDate <= startDateTo,
    );
  } else return campaigns;
}

export function applyFilters(campaigns: Campaign[], filters: CampaignFilters) {
  let result = campaigns;
  result = filterBySearch(result, filters.search);
  result = filterByChannel(result, filters.channels);
  result = filterByStatus(result, filters.statuses);
  result = filterByDateRange(
    result,
    filters.startDateFrom,
    filters.startDateTo,
  );
  return result;
}

// *****************************************************************************************************
// Filter Strip UI Functions - When user filters, the store states change --> 'filtered' list re-renders
// *****************************************************************************************************

// Google - Meta - LinkedIn - TikTok
export function handleChannelChange(channel: CampaignChannel) {
  const currentChannels = useCampaignStore.getState().channels;
  const updateChannels = useCampaignStore.getState().updateChannels;

  const newChannels = currentChannels.includes(channel)
    ? currentChannels.filter((c) => c !== channel)
    : [...currentChannels, channel];

  updateChannels(newChannels);
}

// Active - Paused - Ended
export function handleStatusChange(status: CampaignStatus) {
  const currentStatuses = useCampaignStore.getState().statuses;
  const updateStatuses = useCampaignStore.getState().updateStatuses;
  const newStatuses = currentStatuses.includes(status)
    ? currentStatuses.filter((s) => s !== status)
    : [...currentStatuses, status];
  updateStatuses(newStatuses);
}

// Start Date Range
export function handleStartDateFrom(startDateFrom: string | null) {
  const updateStartDateFrom = useCampaignStore.getState().updateStartDateFrom;
  updateStartDateFrom(startDateFrom);
}

export function handleStartDateTo(startDateTo: string | null) {
  const updateStartDateFrom = useCampaignStore.getState().updateStartDateTo;
  updateStartDateFrom(startDateTo);
}

// Searching by name via input field
export function handleSearch(search: string) {
  const updateSearch = useCampaignStore.getState().updateSearch;
  updateSearch(search);
}

// ********************
// FILTERS IN URL
// ********************


// when 'filters' updates - we update the URL accordingly
export function updateFiltersInUrl(filters: CampaignFilters): void {
const params = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(filters)) {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        params.delete(key);
      } else {
        const encodedValue = Array.isArray(value)
          ? value.join(",")
          : value;
        params.set(key, encodedValue);
      }
    }

    const newUrl = params.toString()
      ? `?${params.toString()}`
      : window.location.pathname;

    window.history.replaceState(null, "", newUrl);
}


// extracting filter params from URL and updating 'filters' object to match 
export function decodeFiltersFromUrl(value: string | null): CampaignFilters {
  if (!value) return {
    search: "",
    statuses: [] as CampaignStatus[],
    channels: [] as CampaignChannel[],
    startDateFrom: null,
    startDateTo: null,
  }

  const params = new URLSearchParams(value);
  const search = params.get("search") ?? "";
  const channels = params.get("channels")?.split(",") ?? [];
  const statuses = params.get("statuses")?.split(",") ?? [];
  const startDateFrom = params.get("startDateFrom");
  const startDateTo = params.get("startDateTo");

  return {
    search,
    channels: channels as CampaignChannel[],
    statuses: statuses as CampaignStatus[],
    startDateFrom,
    startDateTo,
  }
}





// ********************
// SORT LOGIC
// ********************

export function getSortValue(campaign: Campaign, key: CampaignSortKey) {
  if (key === "ctr") {
    return campaign.impressions === 0 ? null : campaign.clicks / campaign.impressions;
  }

  if (key === "cpa") {
    return campaign.conversions === 0 ? null : campaign.spend / campaign.conversions;
  }

  return campaign[key];
}

// updating mapped results in UI whenever sortConfig updates
export function sortCampaigns(
  campaigns: Campaign[],
  sortConfig: SortConfig[],
): Campaign[] {
  if (sortConfig.length === 0) return [...campaigns];

  return [...campaigns].sort((a, b) => {
    for (const sort of sortConfig) {
      const valueA = getSortValue(a, sort.key);
      const valueB = getSortValue(b, sort.key);
      if (valueA === null && valueB === null) continue;
      if (valueA === null) return 1;
      if (valueB === null) return -1;
      if (valueA < valueB) return sort.direction === "asc" ? -1 : 1;
      if (valueA > valueB) return sort.direction === "asc" ? 1 : -1;
    }
    return 0;
  });
}


// updating sortConfig in zustand store => updating the mapped 'sorted' array above
export function sortClick(column: keyof Campaign) {
  const { sortConfig, updateSortConfig } = useCampaignStore.getState();

  const existingSort = sortConfig.find((sort) => sort.key === column);

  // FIRST CLICK: add this column as a new sort layer
  if (!existingSort) {
    updateSortConfig([...sortConfig, { key: column, direction: "asc" }]);
    return;
  }

  // SECOND CLICK: change asc to desc
  if (existingSort.direction === "asc") {
    updateSortConfig(
      sortConfig.map((sort) =>
        sort.key === column ? { ...sort, direction: "desc" } : sort,
      ),
    );
    return;
  }

  // THIRD CLICK: remove this column from sorting
  updateSortConfig(sortConfig.filter((sort) => sort.key !== column));
}

// ****************
// Sorts in URL
// ***************

//sortConfig object --> turned into a string value for URL
export function encodeSortConfig(sortConfig: SortConfig[]) {
  return sortConfig
    .map((sort) => `${sort.key}:${sort.direction}`)
    .join(",");
}

// String value from URL --> turned into a sortConfig object
export function decodeSortConfig(value: string | null): SortConfig[] {
  if (!value) return [];

  return value.split(",").map((item) => {
    const [key, direction] = item.split(":");

    return {
      key: key as CampaignSortKey,
      direction: direction as "asc" | "desc",
    };
  });
}

  // when 'sortConfig' updates - we update the URL accordingly
export function updateSortsInUrl(sortConfig: SortConfig[]) {
  const params = new URLSearchParams(window.location.search);

    if (sortConfig.length > 0) {
      params.set("sort", encodeSortConfig(sortConfig));
    } else {
      params.delete("sort");
    }

    const newUrl = params.toString()
      ? `?${params.toString()}`
      : window.location.pathname;

    window.history.replaceState(null, "", newUrl);
}


// ***********************
// KPI Cards Functions
// ***********************

export function totals(campaigns: Campaign[], key: key): string | undefined {
  const total = campaigns.reduce((total, campaign) => total + campaign[key], 0);
  return formatNumber(total);
}

export function avgCtr(campaigns: Campaign[]): string {
  const totalClicks = campaigns.reduce(
    (total, campaign) => total + campaign.clicks,
    0,
  );
  const totalImpressions = campaigns.reduce(
    (total, campaign) => total + campaign.impressions,
    0,
  );
  const avgCtr = (totalClicks / totalImpressions) * 100;
  return avgCtr ? avgCtr.toFixed(1) + "%" : "0%";
}
