import Style from "./searchbar.module.css";

const SearchBar = ({ setSearch, search }: SearchProps) => {
  return (
    <div className={Style.searchBar}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search Characters name"
        className={Style.input}
      />
      {/* <button
        //   onClick={handleSearch}
        className={Style.button}
      >
        Search
      </button> */}
    </div>
  );
};

export default SearchBar;
