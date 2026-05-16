
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
      className="px-3 py-1 border border-gray-400 rounded-lg text-lg flex-1 max-w-55 focus:outline-none"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setQuery(e.target.value)
      }
    />
  );
};

export default SearchField;
