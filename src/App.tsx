import { applyFilters, cn } from "./lib/utils";
import { KPISection } from "./components/KPISection";
import { campaigns } from "./data/campaigns";
import { type Campaign } from "./types";
import { useCampaignStore } from "./store/store";

function App() {
  const search = useCampaignStore((state) => state.search);
  const channels = useCampaignStore((state) => state.channels);
  const statuses = useCampaignStore((state) => state.statuses);
  const startDateFrom = useCampaignStore((state) => state.startDateFrom);
  const startDateTo = useCampaignStore((state) => state.startDateTo);

  const filters = {
    search,
    channels,
    statuses,
    startDateFrom,
    startDateTo,
  };

  const filtered: Campaign[] = applyFilters(campaigns, filters);

  return (
    <div className="h-screen w-screen bg-[#E3FAFF] p-8">
      <div
        className={cn(
          "h-full grid grid-cols-[220px_1fr] gap-4 text-2xl max-w-8xl mx-auto rounded-[20px]",
        )}
      >
        <div className="rounded-[20px] p-4 mr-1 bg-gray-50 hidden md:block">
          Sidebar
        </div>
        <div className="rounded-[20px] bg-gray-50 flex flex-col col-span-2 md:col-2">
          <div className=" pt-4 pb-4 pl-6 text-4xl font-bold text-[#0E5585]">
            Campaign Dashboard
          </div>
          <div className="p-6">
            <KPISection />
          </div>
          <div className="p-6">
            {filtered.map((campaign: Campaign) => (
              <div
                key={campaign.id}
                className="mb-4 p-4 bg-white rounded-lg shadow"
              >
                <h3 className="text-lg font-semibold">{campaign.name}</h3>
                <p>Channel: {campaign.channel}</p>
                <p>Status: {campaign.status}</p>
                <p>Spend: {campaign.spend}</p>
                <p>Start Date: {campaign.startDate}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
