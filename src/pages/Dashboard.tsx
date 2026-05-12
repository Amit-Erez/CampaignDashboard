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
  const [statusDropdownOpen, setStatusDropdownOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
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
    <main className="relative h-screen w-screen bg-blue p-8 overflow-hidden">
      <div
        className={cn(
          "h-full flex min-[960px]:grid min-[960px]:grid-cols-[220px_1fr] gap-4 text-2xl max-w-8xl mx-auto rounded-[20px]",
        )}
      >
        <div className="rounded-[20px] p-4 mr-1 bg-[#F2F2F2] hidden min-[960px]:flex min-[960px]:flex-col items-center shadow-2xl">
          <img
            src={logo}
            alt="Pulse Analytics logo"
            className="w-34 inline-block mb-6"
          />
        </div>
        <div className="rounded-[20px] bg-[#F2F2F2] flex flex-col col-span-2 md:col-2 overflow-hidden min-h-0 shadow-2xl">
          <div className="flex items-end pt-4 pb-4 pl-6 text-4xl font-bold text-[#0E5585]">
            {/* <img
              src={logo}
              alt="Logo"
              className="w-34 inline-block md:hidden border-[#02252b] border-r-3 pr-1"
            /> */}
            <h1 className="flex text-[26px] text-[#02252b] font-semibold">
              Campaign Performance Dashboard
            </h1>
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
            <Table
              filters={filters}
              filtered={filtered}
              setModalOpen={setModalOpen}
            />
          </div>
        </div>
      </div>
      {modalOpen && (
        <div className="absolute flex items-center justify-center h-screen w-full top-0 left-0 z-1000 bg-[#4d6a92d2]">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="campaign-modal-title"
            className="flex items-center justify-center h-[80%] w-[80%] border bg-[#F2F2F2] rounded-2xl"
          >
            <h2 id="campaign-modal-title">Campaign details</h2>
            <button
              type="button"
              aria-label="Close campaign details modal"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Dashboard;
