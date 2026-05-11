import { useEffect, useState } from "react";
import {
  decodeFiltersFromUrl,
  decodeSortConfig,
  formatNumber,
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
  const updateSortConfig = useCampaignStore((state) => state.updateSortConfig);
  const setFilters = useCampaignStore((state) => state.setFilters)
  const sorted = sortCampaigns(filtered, sortConfig);

  const tableHeaders = [
    { name: "Select" },
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

  function formatDate(dateString: string | null) {
    if (!dateString) return "Ongoing";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function handleSort(key: keyof Campaign) {
    sortClick(key);
  }

  // On first mount - URL params will update sortConfig and filters in store
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sortFromUrl = decodeSortConfig(params.get("sort"));
    const filtersFromUrl = decodeFiltersFromUrl(window.location.search)
    console.log(window.location.search)

    updateSortConfig(sortFromUrl);
    setFilters(filtersFromUrl)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasLoadedUrl(true);
  }, [updateSortConfig, setFilters]);


  // when sortConfig updates - we update the URL accordingly
  useEffect(() => {
    if (!hasLoadedUrl) return;
    updateSortsInUrl(sortConfig)
  }, [sortConfig, hasLoadedUrl]);

  // when 'filters' updates - we update the URL accordingly
  useEffect(() => {
    if (!hasLoadedUrl) return;
    updateFiltersInUrl(filters)
  }, [filters, hasLoadedUrl]);

  return (
    <div className="h-full min-h-0 overflow-y-auto no-scrollbar border-gray-400 rounded-b-[20px] border">
      <table className="min-w-full">
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
                  className="text-center"
                  onClick={
                    header.sortName
                      ? () => handleSort(header.sortName as keyof Campaign)
                      : undefined
                  }
                >
                  {activeSort ? (
                    <span className="flex items-center justify-center">
                      <span className="mr-1 text-xs text-gray-800 border rounded-full px-1 bg-[#b3ebce]">
                        {sortIndex + 1}
                      </span>
                      {header.name}
                      <span className="ml-1 text-lg font-bold text-gray-800">
                        {activeSort.direction === "asc" ? " ↑" : " ↓"}
                      </span>
                    </span>
                  ) : (
                    header.name
                  )}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {sorted.map((campaign) => (
            <tr
              className="h-20 border-t hover:bg-[#b0d7e5] transition-colors cursor-pointer"
              key={campaign.id}
              onClick={() => setModalOpen(true)}
            >
              <td className="p-2 text-center">
                <input type="checkbox" className="w-4 h-4" />
              </td>
              <td className="p-2 text-center text-sm font-semibold w-50">
                {campaign.name}
              </td>
              <td className="text-center text-sm">{campaign.channel}</td>
              <td className="text-center text-sm">{campaign.status}</td>
              <td className="text-center text-sm">
                {formatDate(campaign.startDate)}
              </td>
              <td className="text-center text-sm">
                {formatDate(campaign.endDate)}
              </td>
              <td className="text-center text-sm">
                {"$" + formatNumber(campaign.budget)}
              </td>
              <td className="text-center text-sm">
                {"$" + formatNumber(campaign.spend)}
              </td>
              <td className="text-center text-sm">
                {formatNumber(campaign.impressions)}
              </td>
              <td className="text-center text-sm">
                {formatNumber(campaign.clicks)}
              </td>
              <td className="text-center text-sm">
                {((campaign.clicks / campaign.impressions) * 100).toFixed(1) +
                  "%"}
              </td>
              <td className="text-center text-sm">
                {formatNumber(campaign.conversions)}
              </td>
              <td className="text-center text-sm">
                {"$" + (campaign.spend / campaign.conversions).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
