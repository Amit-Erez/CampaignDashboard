import { handleStatusChange } from "../lib/utils";
import { CampaignStatus, type CampaignFilters } from "../types";

const StatusSelector = ({
  statusDropdownOpen,
  setStatusDropdownOpen,
  filters,
}: {
  statusDropdownOpen: boolean;
  setStatusDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filters: CampaignFilters;
}) => {

// to do - add 'click outside to close dropdown'

  return (
    <div className="relative group z-1000">
      <button
        className="cursor-pointer px-4 py-2 border border-gray-300 rounded-lg text-lg bg-white hover:bg-gray-50 flex items-center gap-2"
        onClick={() => setStatusDropdownOpen((prev) => !prev)}
      >
        <span>Status</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>
      {statusDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10 cursor-pointer">
          <label
            className="flex items-center gap-2 px-4 py-3 text-lg hover:bg-gray-50 cursor-pointer border-b border-gray-200"
            onClick={() => handleStatusChange(CampaignStatus.Active)}
          >
            <input
              type="checkbox"
              className="w-5 h-5"
              checked={filters.statuses.includes(CampaignStatus.Active)}
              readOnly
            />
            <span>Active</span>
          </label>
          <label
            className="flex items-center gap-2 px-4 py-3 text-lg hover:bg-gray-50 cursor-pointer border-b border-gray-200"
            onClick={() => handleStatusChange(CampaignStatus.Paused)}
          >
            <input
              type="checkbox"
              className="w-5 h-5"
              checked={filters.statuses.includes(CampaignStatus.Paused)}
              readOnly
            />
            <span>Paused</span>
          </label>
          <label
            className="flex items-center gap-2 px-4 py-3 text-lg hover:bg-gray-50 cursor-pointer"
            onClick={() => handleStatusChange(CampaignStatus.Ended)}
          >
            <input
              type="checkbox"
              className="w-5 h-5"
              checked={filters.statuses.includes(CampaignStatus.Ended)}
              readOnly
            />
            <span>Ended</span>
          </label>
        </div>
      )}
    </div>
  );
};

export default StatusSelector;
