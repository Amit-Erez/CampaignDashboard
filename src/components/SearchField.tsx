import { useEffect, useState } from "react";
import { handleSearch } from "../lib/utils";

const SearchField = () => {
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
    <input
      type="text"
      value={query}
      placeholder="Search campaigns..."
      className="px-3 py-2 border border-gray-400 rounded-lg text-lg flex-1 max-w-xs focus:outline-none"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setQuery(e.target.value)
      }
    />
  );
};

export default SearchField;
