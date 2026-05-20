import { applyFilters, cn } from "../lib/utils";
import { KPISection } from "../components/KPISection";
import { campaigns } from "../data/campaigns";
import { type Campaign, type CampaignFilters } from "../types";
import { useCampaignStore } from "../store/store";
import { useEffect, useState } from "react";
import logo from "../assets/logo4-home.svg";
import Filters from "../components/Filters";
import Table from "../components/Table";
import Modal from "../components/Modal";

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

  useEffect(() => {
    if (!modalOpen) return;

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape" && modalOpen) setModalOpen(false);
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [modalOpen]);

  return (
    <main className="relative flex sm:h-screen w-full bg-blue p-4 sm:p-8 overflow-hidden">
      <div
        className={cn(
          "h-full flex text-2xl w-full min-w-0 mx-auto rounded-[20px] animate-fade-in",
        )}
      >
        <div className="rounded-[20px] bg-[#F2F2F2] flex flex-col col-span-2 md:col-2 overflow-hidden min-h-0 shadow-2xl w-full max-w-400 mx-auto">
          <div className="flex items-center md:items-end pt-4 sm:pb-4 pl-6 text-4xl font-bold text-[#0E5585]">
            <img
              src={logo}
              alt="Logo"
              width={96}
              height={96}
              className="w-24 inline-block border-[#02252b] pb-1 mr-10"
            />
            <h1 className="flex text-[16px] sm:text-[26px] md:text-[36px] font-semibold text-[#02252b]!">
              Campaign Performance Dashboard
            </h1>
          </div>
          <div className="pl-6 pr-6 pt-2 pb-4">
            <KPISection filtered={filtered} />
          </div>
          <div className="flex justify-end">
            <Filters
              statusDropdownOpen={statusDropdownOpen}
              setStatusDropdownOpen={setStatusDropdownOpen}
              filters={filters}
            />
          </div>
          <div className="border-t border-gray-200 flex-1 min-h-0 min-w-0 overflow-hidden">
            <Table
              filters={filters}
              filtered={filtered}
              setModalOpen={setModalOpen}
            />
          </div>
        </div>
      </div>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </main>
  );
}

export default Dashboard;

// <div className="absolute flex items-center justify-center h-screen w-full top-0 left-0 z-1000 bg-[#4d6a92d2]">
//   <div
//     role="dialog"
//     aria-modal="true"
//     aria-labelledby="campaign-modal-title"
//     className="flex items-center justify-center h-[80%] w-[80%] border bg-[#F2F2F2] rounded-2xl"
//   >
//     <h2 id="campaign-modal-title">Campaign details</h2>
//     <button
//       type="button"
//       aria-label="Close campaign details modal"
//       onClick={() => setModalOpen(false)}
//     >
//       Close
//     </button>
//   </div>
// </div>
