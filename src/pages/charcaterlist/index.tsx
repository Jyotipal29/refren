import Style from "./charcaterlist.module.css";
import { useFetchCharacters } from "../../hooks/useFetchCharacters";
import SearchBar from "../../components/searchbar";
import FilterBar from "../../components/filterbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CharacterList = () => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);
  const { characters, setPage, hasMore, loading } = useFetchCharacters();
  // console.log(characters);
  // console.log(characters.map((char) => char.gender));
  // console.log(characters.map((char) => char.status));
  // console.log(characters.map((char) => char.species));
  // console.log(characters.map((char) => char.type));

  const filteredChar = characters.filter((char) => {
    return (
      (!search ||
        char.name.trim().toLowerCase().includes(search.trim().toLowerCase())) &&
      (!selectedStatus ||
        char.status.trim().toLowerCase() ===
          selectedStatus.trim().toLowerCase()) &&
      (!selectedGender ||
        char.gender.trim().toLowerCase() ===
          selectedGender.trim().toLowerCase()) &&
      (!selectedSpecies ||
        char.species.trim().toLowerCase() ===
          selectedSpecies.trim().toLowerCase())
    );
  });

  console.log(filteredChar, "fill");

  // Infinite scroll function
  const handleScroll = () => {
    // Get the scrollable height, current scroll position, and the window height
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    // Check if the user has scrolled close to the bottom (with some margin)
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      if (hasMore && !loading) {
        console.log("here");
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);
  return (
    <div className={Style.container}>
      <SearchBar setSearch={setSearch} search={search} />

      <div className={Style.content_wrapper}>
        {/* filter */}
        <div className={Style.filter_wrapper}>
          <FilterBar
            selectedStatus={selectedStatus}
            selectedGender={selectedGender}
            selectedSpecies={selectedSpecies}
            setSelectedStatus={setSelectedStatus}
            setSelectedGender={setSelectedGender}
            setSelectedSpecies={setSelectedSpecies}
            // onFilterChange={(newFilters) => setFilters(newFilters)}
          />
        </div>
        {/* main body */}
        <div className={Style.character_wrapper}>
          {filteredChar?.map((character: User) => (
            <Link
              to={`/profile/${character.id}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <div key={character.id} className={Style.character_card}>
                <img src={character.image} className={Style.character_image} />
                <p className={Style.character_name}>{character.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterList;
