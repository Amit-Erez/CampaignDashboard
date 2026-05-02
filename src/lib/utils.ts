import { useCampaignStore } from "../store/store";
import type { Campaign, CampaignChannel, CampaignFilters, CampaignStatus } from "../types";

export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
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
  const cleanSearch = search.toLowerCase().trim()
  if (!cleanSearch) return campaigns;
  return campaigns.filter((campaign) => campaign.name.toLowerCase().includes(cleanSearch));
}

export function filterByDateRange(
  campaigns: Campaign[],
  startDateFrom: string | null,
  startDateTo: string | null,
): Campaign[] {
  if(startDateTo && !startDateFrom) {
    return campaigns.filter(
    (campaign) => campaign.startDate <= startDateTo)
  } else if (startDateFrom && !startDateTo) {
    return campaigns.filter(
      (campaign) => campaign.startDate >= startDateFrom)
  } else if (startDateFrom && startDateTo){
    return campaigns.filter(
    (campaign) => campaign.startDate >= startDateFrom && campaign.startDate <= startDateTo)
  } else return campaigns
}

export function applyFilters(campaigns: Campaign[], filters: CampaignFilters) {
let result = campaigns
result = filterBySearch(result, filters.search)
result = filterByChannel(result, filters.channels)
result = filterByStatus(result, filters.statuses)
result = filterByDateRange(result, filters.startDateFrom, filters.startDateTo)
return result
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
    updateStartDateFrom(startDateFrom)
  }

   export function handleStartDateTo(startDateTo: string | null) {
    const updateStartDateFrom = useCampaignStore.getState().updateStartDateTo;
    updateStartDateFrom(startDateTo)
  }

  // Searching by name via input field 
  export function handleSearch(search: string) {
    const updateSearch = useCampaignStore.getState().updateSearch;
    updateSearch(search)
  }