import { handleStartDateFrom, handleStartDateTo } from "../lib/utils";

const DateSelector = () => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="date"
        aria-label="Start date from"
        className="px-3 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-500 cursor-pointer"
        onChange={(e) => {
          const value = e.target.value;
          handleStartDateFrom(value || null);
        }}
      />
      <span className="text-lg">to</span>
      <input
        type="date"
        aria-label="Start date to"
        className="px-3 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-500 cursor-pointer"
        onChange={(e) => {
          const value = e.target.value;
          handleStartDateTo(value || null);
        }}
      />
    </div>
  );
};

export default DateSelector;
