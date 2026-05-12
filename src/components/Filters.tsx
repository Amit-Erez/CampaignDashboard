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
    <div className="px-6 py-4 border-b border-gray-200">
      <div className="flex flex-wrap items-center justify-end gap-6">
        {!noSortsOrFilters(filters, sortConfig) && (
          <button
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => {
              resetFilters();
              setQuery("");
            }}
          >
            Reset
          </button>
        )}
        {/* Search Input */}
        <SearchField query={query} setQuery={setQuery} />

        {/* Channel Checkboxes */}
        <ChannelBoxes filters={filters} />

        {/* Date Range Selector */}
        <DateSelector />

        {/* Status Dropdown */}
        <div ref={selectorRef}>
          <StatusSelector
            filters={filters}
            statusDropdownOpen={statusDropdownOpen}
            setStatusDropdownOpen={setStatusDropdownOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
