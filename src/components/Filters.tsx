import { useEffect, useRef } from "react";
import type { CampaignFilters } from "../types";
import ChannelBoxes from "./ChannelBoxes";
import DateSelector from "./DateSelector";
import SearchField from "./SearchField";
import StatusSelector from "./StatusSelector";

const Filters = ({
  statusDropdownOpen,
  setStatusDropdownOpen,
  filters,
}: {
  statusDropdownOpen: boolean;
  setStatusDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filters: CampaignFilters;
}) => {
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

  return (
    <div className="px-6 py-4 border-b border-gray-200">
      <div className="flex flex-wrap items-center justify-end gap-6">
        {/* Search Input */}
        <SearchField filters={filters} />

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
