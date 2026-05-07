import { formatNumber, sortCampaigns, sortClick } from "../lib/utils";
import { useCampaignStore } from "../store/store";
import type { Campaign } from "../types";

const Table = ({ filtered }: { filtered: Campaign[] }) => {
  const sortConfig = useCampaignStore((state) => state.sortConfig);
  const sorted = sortCampaigns(filtered, sortConfig);

  const tableHeaders = [
    { name: "Select", sortName: "Select" },
    { name: "Campaign Name", sortName: "name" },
    { name: "Channel", sortName: "channel" },
    { name: "Status", sortName: "status" },
    { name: "Start Date", sortName: "startDate" },
    { name: "End Date", sortName: "endDate" },
    { name: "Budget", sortName: "budget" },
    { name: "Spend", sortName: "spend" },
    { name: "Impressions", sortName: "impressions" },
    { name: "Clicks", sortName: "clicks" },
    { name: "CTR" },
    { name: "Conversions", sortName: "conversions" },
    { name: "CPA" },
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

  return (
    <div className="h-full min-h-0 overflow-y-auto no-scrollbar border-gray-400 rounded-b-[20px] border">
      <table className="min-w-full">
        <thead className="sticky top-0 z-10 bg-gray-100 text-sm font-medium h-10 text-gray-700">
          <tr>
            {tableHeaders.map((header, index) => (
              <th
                key={index}
                className="text-center"
                onClick={
                  header.sortName
                    ? () => handleSort(header.sortName as keyof Campaign)
                    : undefined
                }
              >
                {header.name}
                {sortConfig[0]?.key === header.sortName && (
                  <span>{sortConfig[0]?.direction === "asc" ? " ↑" : " ↓"}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sorted.map((campaign) => (
            <tr className="h-20 border-t" key={campaign.id}>
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
