import { handleSearch } from "../lib/utils";
import type { CampaignFilters } from "../types";

const SearchField = ({ filters }: { filters: CampaignFilters }) => {


  return (
    <input
      type="text"
      value={filters.search}
      placeholder="Search campaigns..."
      className="px-3 py-2 border border-gray-400 rounded-lg text-lg flex-1 max-w-xs focus:outline-none"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
    />
  );
};

export default SearchField;
