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