import { applyFilters, cn } from "./lib/utils";
import { KPISection } from "./components/KPISection";
import { campaigns } from "./data/campaigns";
import { type Campaign, type CampaignFilters } from "./types";
import { useCampaignStore } from "./store/store";
import { useState } from "react";
import logo from "./assets/logo2.png";
import Filters from "./components/Filters";

function App() {
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [logoScreen, setLogoScreen] = useState(true);
  const search = useCampaignStore((state) => state.search);
  const channels = useCampaignStore((state) => state.channels);
  const statuses = useCampaignStore((state) => state.statuses);
  const startDateFrom = useCampaignStore((state) => state.startDateFrom);
  const startDateTo = useCampaignStore((state) => state.startDateTo);

  const filters: CampaignFilters = {
    search,
    channels,
    statuses,
    startDateFrom,
    startDateTo,
  };

  const filtered: Campaign[] = applyFilters(campaigns, filters);

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className="h-screen w-screen bg-[#E3FAFF] p-8">
      {logoScreen && 
      <div className="absolute flex items-center justify-center h-screen top-0 left-0 w-full bg-gray-50 z-1000">
        <img src={logo} alt="Logo" className="w-300 inline-block mb-6 animate-pulse cursor-pointer" 
        onClick={() => setLogoScreen(false)}/>
      </div>
      }
      <div
        className={cn(
          "h-full grid grid-cols-[220px_1fr] gap-4 text-2xl max-w-8xl mx-auto rounded-[20px]",
        )}
      >
        <div className="rounded-[20px] p-4 mr-1 bg-gray-50 hidden md:flex md:flex-col items-center">
          <img src={logo} alt="Logo" className="w-34 inline-block mb-6" />
        </div>
        <div className="rounded-[20px] bg-gray-50 flex flex-col col-span-2 md:col-2 overflow-hidden">
          <div className="flex items-end pt-4 pb-4 pl-6 text-4xl font-bold text-[#0E5585]">
            <img
              src={logo}
              alt="Logo"
              className="w-34 inline-block md:hidden border-[#02252b] border-r-3 pr-1"
            />
            <div className="flex text-[24px] text-[#02252b] font-normal pl-4">
              Ad Campaign
              <br />
              Performance Dashboard
            </div>
          </div>
          <div className="pl-6 pr-6 pt-4 pb-4">
            <KPISection filtered={filtered}/>
          </div>
          <Filters
            statusDropdownOpen={statusDropdownOpen}
            setStatusDropdownOpen={setStatusDropdownOpen}
            filters={filters}
          />
          <div className="flex flex-wrap p-6 overflow-y-scroll">
            {filtered.map((campaign: Campaign) => (
              <div
                key={campaign.id}
                className="mb-4 p-4 bg-white rounded-lg shadow w-1/4 cursor-pointer hover:shadow-md hover:bg-gray-50 transition-shadow"
              >
                <h3 className="text-[22px] font-semibold">{campaign.name}</h3>
                <p className="text-lg">Channel: {campaign.channel}</p>
                <p className="text-lg">Status: {campaign.status}</p>
                <p className="text-lg">Spend: {campaign.spend}</p>
                <p className="text-lg">
                  <p>Started: {formatDate(campaign.startDate)}</p>
                </p>
                {campaign.endDate && (
                  <p className="text-lg">
                    <p>Ended: {formatDate(campaign.endDate)}</p>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
