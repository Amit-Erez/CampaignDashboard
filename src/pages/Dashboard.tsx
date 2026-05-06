import { applyFilters, cn } from "../lib/utils";
import { KPISection } from "../components/KPISection";
import { campaigns } from "../data/campaigns";
import { type Campaign, type CampaignFilters } from "../types";
import { useCampaignStore } from "../store/store";
import { useState } from "react";
import logo from "../assets/logo4.svg";
import Filters from "../components/Filters";
import Table from "../components/Table";

function Dashboard() {
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
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

  return (
    <div className="h-screen w-screen bg-blue p-8">
      <div
        className={cn(
          "h-full grid grid-cols-[220px_1fr] gap-4 text-2xl max-w-8xl mx-auto rounded-[20px]",
        )}
      >
        <div className="rounded-[20px] p-4 mr-1 bg-[#F2F2F2] hidden md:flex md:flex-col items-center">
          <img src={logo} alt="Logo" className="w-34 inline-block mb-6" />
        </div>
        <div className="rounded-[20px] bg-[#F2F2F2] flex flex-col col-span-2 md:col-2 overflow-hidden min-h-0">
          <div className="flex items-end pt-4 pb-4 pl-6 text-4xl font-bold text-[#0E5585]">
            {/* <img
              src={logo}
              alt="Logo"
              className="w-34 inline-block md:hidden border-[#02252b] border-r-3 pr-1"
            /> */}
            <div className="flex text-[26px] text-[#02252b] font-semibold">
              Campaign Performance Dashboard
            </div>
          </div>
          <div className="pl-6 pr-6 pt-4 pb-4">
            <KPISection filtered={filtered} />
          </div>
          <Filters
            statusDropdownOpen={statusDropdownOpen}
            setStatusDropdownOpen={setStatusDropdownOpen}
            filters={filters}
          />
          <div className="border-t border-gray-200 flex-1 min-h-0">
            <Table filtered={filtered} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
