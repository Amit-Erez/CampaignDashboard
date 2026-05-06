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
        <StatusSelector filters={filters} statusDropdownOpen={statusDropdownOpen} setStatusDropdownOpen={setStatusDropdownOpen} />
      </div>
    </div>
  );
};

export default Filters;
