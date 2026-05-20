
const SearchField = ({query, setQuery}: {
  query: string, setQuery:
  React.Dispatch<React.SetStateAction<string>>  
}) => {


  return (
    <input
      type="text"
      aria-label="Search campaigns"
      value={query}
      placeholder="Search campaigns..."
      className="px-3 py-2 sm:py-1 border border-gray-400 rounded-lg text-[14px] sm:text-lg w-40 sm:w-55 focus:outline-none"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setQuery(e.target.value)
      }
    />
  );
};

export default SearchField;
