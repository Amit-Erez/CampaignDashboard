import type { Campaign } from "../types";

const Table = ({ filtered }: { filtered: Campaign[] }) => {

    const tableHeaders = [
        {name: "Campaign Name"},
        {name: "Channel"},
        {name: "Status"},
        {name: "Start Date"},
        {name: "End Date"},
        {name: "Budget"},
        {name: "Spend"},
        {name: "Impressions"},
        {name: "Clicks"},
        {name: "CTR"},
        {name: "Conversions"},
        {name: "CPA"},
    ]


  function formatDate(dateString: string | null) {
    if (!dateString) return "Ongoing";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className="h-full min-h-0 overflow-y-auto no-scrollbar border-gray-400 rounded-b-[20px] border">
      <table className="min-w-full">
        <thead className="sticky top-0 z-10 bg-gray-100 text-sm font-medium h-10 text-gray-700">
          <tr>
            {tableHeaders.map((header, index) => 
                <th key={index} className="text-center">{header.name}</th>
                )
            }
          </tr>
        </thead>

        <tbody>
          {filtered.map((campaign) => (
            <tr className="h-20 border-t" key={campaign.id}>
              <td className="p-2 text-left text-sm font-semibold w-50">
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
              <td className="text-center text-sm">{campaign.budget}</td>
              <td className="text-center text-sm">{campaign.spend}</td>
              <td className="text-center text-sm">{campaign.impressions}</td>
              <td className="text-center text-sm">{campaign.clicks}</td>
              <td className="text-center text-sm">CTR</td>
              <td className="text-center text-sm">{campaign.conversions}</td>
              <td className="text-center text-sm">CPA</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
