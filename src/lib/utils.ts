import { useCampaignStore } from "../store/store";
import type {
  Campaign,
  CampaignChannel,
  CampaignFilters,
  CampaignStatus,
  key,
} from "../types";

// *******************
// GENERAL Functions
// *******************

export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatNumber(num: number) {
  if (num < 1_000) {
    return num.toString();
  }

  if (num < 1_000_000) {
    return (num / 1000).toFixed(1) + "k";
  }

  return (num / 1_000_000).toFixed(1) + "M";
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

// KPI Cards Functions

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
  return avgCtr.toFixed(1) + "%";
}


