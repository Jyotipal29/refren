import Style from "./charcaterlist.module.css";
import { useFetchCharacters } from "../../hooks/useFetchCharacters";
import SearchBar from "../../components/searchbar";
import FilterBar from "../../components/filterbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/spinner";
const CharacterList = () => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);
  const { characters, setPage, hasMore, loading } = useFetchCharacters();

  const filteredChar = characters?.filter((char) => {
    return (
      (!search ||
        char?.name
          ?.trim()
          .toLowerCase()
          .includes(search?.trim().toLowerCase())) &&
      (!selectedStatus ||
        char?.status?.trim().toLowerCase() ===
          selectedStatus?.trim().toLowerCase()) &&
      (!selectedGender ||
        char?.gender?.trim().toLowerCase() ===
          selectedGender?.trim().toLowerCase()) &&
      (!selectedSpecies ||
        char?.species?.trim().toLowerCase() ===
          selectedSpecies?.trim().toLowerCase())
    );
  });

  // Infinite scroll function
  const handleScroll = () => {
    // Get the scrollable height, current scroll position, and the window height
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    // Check if the user has scrolled close to the bottom (with some margin)
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      if (hasMore && !loading) {
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
      <h1 className={Style.heading}>Characters of Rick & Morty</h1>

      <SearchBar
        setSearch={setSearch}
        search={search}
        text={"search characters name"}
      />

      <Spinner loading={loading} />

      <div className={Style.content_wrapper}>
        <FilterBar
          selectedStatus={selectedStatus}
          selectedGender={selectedGender}
          selectedSpecies={selectedSpecies}
          setSelectedStatus={setSelectedStatus}
          setSelectedGender={setSelectedGender}
          setSelectedSpecies={setSelectedSpecies}
        />

        <div className={Style.character_wrapper}>
          {filteredChar?.map((character: User, index: number) => (
            <div key={index} className={Style.character_card}>
              <img src={character?.image} className={Style.character_image} />
              <p className={Style.character_name}>{character?.name}</p>
              <Link
                to={`/profile/${character?.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <button className={Style.button}>View Profile</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterList;
