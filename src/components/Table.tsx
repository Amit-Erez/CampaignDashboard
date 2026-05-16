import { useEffect, useState } from "react";
import {
  cn,
  decodeFiltersFromUrl,
  decodeSortConfig,
  formatDate,
  formatNumber,
  rowInteractionColor,
  sortCampaigns,
  sortClick,
  updateFiltersInUrl,
  updateSortsInUrl,
} from "../lib/utils";
import { useCampaignStore } from "../store/store";
import type { Campaign, CampaignFilters } from "../types";

const Table = ({
  filters,
  filtered,
  setModalOpen,
}: {
  filters: CampaignFilters;
  filtered: Campaign[];
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [hasLoadedUrl, setHasLoadedUrl] = useState<boolean>(false);
  const sortConfig = useCampaignStore((state) => state.sortConfig);
  const visibleCampaigns = useCampaignStore((state) => state.visibleCampaigns);
  const setSelectedCampaignIndex = useCampaignStore((state) => state.setSelectedCampaignIndex)
  const setFilters = useCampaignStore((state) => state.setFilters);
  const updateSortConfig = useCampaignStore((state) => state.updateSortConfig);
  const updateVisibleCampaigns = useCampaignStore(
    (state) => state.updateVisibleCampaigns,
  );
  const sorted = sortCampaigns(filtered, sortConfig);

  const tableHeaders = [
    // { name: "Select" }, (checkboxes for selecting rows - potential future feature)
    { name: "Campaign Name", sortName: "name" },
    { name: "Channel", sortName: "channel" },
    { name: "Status", sortName: "status" },
    { name: "Start Date", sortName: "startDate" },
    { name: "End Date", sortName: "endDate" },
    { name: "Budget", sortName: "budget" },
    { name: "Spend", sortName: "spend" },
    { name: "Impressions", sortName: "impressions" },
    { name: "Clicks", sortName: "clicks" },
    { name: "CTR", sortName: "ctr" },
    { name: "Conversions", sortName: "conversions" },
    { name: "CPA", sortName: "cpa" },
  ];


  // updating sortConfig in zustand store => updating the mapped 'sorted' array above
  function handleSort(key: keyof Campaign) {
    sortClick(key);
  }

  // On first mount - URL params will update sortConfig and filters in store
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sortFromUrl = decodeSortConfig(params.get("sort"));
    const filtersFromUrl = decodeFiltersFromUrl(window.location.search);
    console.log(window.location.search);

    updateSortConfig(sortFromUrl);
    setFilters(filtersFromUrl);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasLoadedUrl(true);
  }, [updateSortConfig, setFilters]);

  // when sortConfig updates - we update the URL accordingly
  useEffect(() => {
    if (!hasLoadedUrl) return;
    updateSortsInUrl(sortConfig);
  }, [sortConfig, hasLoadedUrl]);

  // when 'filters' updates - we update the URL accordingly
  useEffect(() => {
    if (!hasLoadedUrl) return;
    updateFiltersInUrl(filters);
  }, [filters, hasLoadedUrl]);

  // when sorting or filtering occurs and updates "sorted", we update the Zustand store with it.
  useEffect(() => {
    updateVisibleCampaigns(sorted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortConfig, filters, updateVisibleCampaigns]);

  return (
    <div className="h-full min-h-0 min-w-0 overflow-hidden rounded-b-[20px] border border-gray-400">
      <div className="h-full min-w-0 overflow-x-auto overflow-y-auto no-scrollbar">

      <table className="w-full min-w-270">
        <thead className="sticky top-0 z-10 bg-[#ccdfe6] text-sm font-medium h-10 text-gray-700">
          <tr>
            {tableHeaders.map((header, index) => {
              const activeSort = sortConfig.find(
                (sort) => sort.key === header.sortName,
              );

              const sortIndex = sortConfig.findIndex(
                (sort) => sort.key === header.sortName,
              );
              return (
                <th
                  key={index}
                  scope="col"
                  aria-sort={
                    header.sortName
                      ? !activeSort
                        ? "none"
                        : activeSort.direction === "asc"
                          ? "ascending"
                          : "descending"
                      : undefined
                  }
                  className="whitespace-nowrap text-center px-2"
                >
                  {header.sortName ? (
                    <button
                      type="button"
                      className="w-full flex items-center justify-center rounded-md transition-colors cursor-pointer hover:scale-[1.02]
                      focus:outline-none
                      focus-visible:bg-[#d8eef8]
                      focus-visible:ring-1  
                      focus-visible:ring-[#0E5585]"
                      onClick={() =>
                        handleSort(header.sortName as keyof Campaign)
                      }
                    >
                      {activeSort && (
                        <span className="flex items-center justify-center w-4 h-4 mr-1 text-xs text-gray-800 border rounded-full px-1 bg-[#b3ebce]">
                          {sortIndex + 1}
                        </span>
                      )}

                      {header.name}

                      {activeSort && (
                        <span className="ml-1 text-lg font-bold text-gray-800">
                          {activeSort.direction === "asc" ? " ↑" : " ↓"}
                        </span>
                      )}
                    </button>
                  ) : (
                    header.name
                  )}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {visibleCampaigns.map((campaign, index) => (
            <tr
              role="button"
              tabIndex={0}
              aria-label={`Open ${campaign.name} details`}
              className={cn(
                "h-20 border-t transition-colors cursor-pointer focus-visible:outline-none",
                rowInteractionColor(campaign.status),
              )}
              key={campaign.id}
              onClick={(e) => {
                setSelectedCampaignIndex(index);
                if((e.target as HTMLInputElement).type !== "checkbox")
                setModalOpen(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setModalOpen(true);
                }
              }}
            >
              {/* <td className="p-2 text-center">
                <input type="checkbox" className="w-4 h-4" />
              </td> */}
              <td className="p-2 text-center text-sm font-semibold w-50">
                {campaign.name}
              </td>
              <td className="text-center text-sm">{campaign.channel}</td>
              <td className="text-center text-sm">{campaign.status}</td>
              <td className="text-center text-sm">
                {formatDate(campaign.startDate)}
              </td>
              <td className="whitespace-nowrap text-center text-sm">
                {formatDate(campaign.endDate)}
              </td>
              <td className="whitespace-nowrap text-center text-sm">
                {"$" + formatNumber(campaign.budget)}
              </td>
              <td className="whitespace-nowrap text-center text-sm">
                {"$" + formatNumber(campaign.spend)}
              </td>
              <td className="whitespace-nowrap text-center text-sm">
                {formatNumber(campaign.impressions)}
              </td>
              <td className="whitespace-nowrap text-center text-sm">
                {formatNumber(campaign.clicks)}
              </td>
              <td className="whitespace-nowrap text-center text-sm">
                {((campaign.clicks / campaign.impressions) * 100).toFixed(1) +
                  "%"}
              </td>
              <td className="whitespace-nowrap text-center text-sm">
                {formatNumber(campaign.conversions)}
              </td>
              <td className="whitespace-nowrap text-center text-sm pr-2">
                {"$" + (campaign.spend / campaign.conversions).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Table;
