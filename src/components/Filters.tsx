import { useEffect, useRef, useState } from "react";
import type {
  CampaignChannel,
  CampaignFilters,
  CampaignStatus,
} from "../types";
import ChannelBoxes from "./ChannelBoxes";
import DateSelector from "./DateSelector";
import SearchField from "./SearchField";
import StatusSelector from "./StatusSelector";
import { useCampaignStore } from "../store/store";
import { handleSearch, noSortsOrFilters } from "../lib/utils";

const Filters = ({
  statusDropdownOpen,
  setStatusDropdownOpen,
  filters,
}: {
  statusDropdownOpen: boolean;
  setStatusDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filters: CampaignFilters;
}) => {
  const updateSortConfig = useCampaignStore((state) => state.updateSortConfig);
  const sortConfig = useCampaignStore((state) => state.sortConfig);
  const setFilters = useCampaignStore((state) => state.setFilters);
  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent): void {
      if (
        selectorRef.current &&
        !selectorRef.current?.contains(e.target as Node)
      ) {
        setStatusDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [statusDropdownOpen, setStatusDropdownOpen]);

  function resetFilters() {
    updateSortConfig([]);
    setFilters({
      search: "",
      statuses: [] as CampaignStatus[],
      channels: [] as CampaignChannel[],
      startDateFrom: null,
      startDateTo: null,
    });
  }

  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);

    return () => clearTimeout(timerId);
  }, [query]);

  useEffect(() => {
    handleSearch(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div className="w-full flex items-end justify-between gap-3 border-b border-gray-200 px-4 py-3">
      <div className="w-full flex flex-wrap items-center justify-center sm:justify-end gap-3">
        {!noSortsOrFilters(filters, sortConfig) && (
          <button
            className="rounded-md border border-gray-300 bg-red-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 cursor-pointer"
            onClick={() => {
              resetFilters();
              setQuery("");
            }}
          >
<span className="hidden min-[455px]:inline">Reset</span>
<span className="inline min-[455px]:hidden">R</span>
          </button>
        )}
        <SearchField query={query} setQuery={setQuery} />
        <div ref={selectorRef} className="block sm:hidden">
          <StatusSelector
            filters={filters}
            statusDropdownOpen={statusDropdownOpen}
            setStatusDropdownOpen={setStatusDropdownOpen}
          />
        </div>

        <ChannelBoxes filters={filters} />
        <div className="flex">

        <DateSelector />
        <div ref={selectorRef} className="hidden sm:block ml-3">
          <StatusSelector
            filters={filters}
            statusDropdownOpen={statusDropdownOpen}
            setStatusDropdownOpen={setStatusDropdownOpen}
          />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
