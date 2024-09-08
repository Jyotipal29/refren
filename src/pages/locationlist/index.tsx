import { useFetchLocations } from "../../hooks/useFetchLocation";
import Style from "./locationlist.module.css";
import SearchBar from "../../components/searchbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/spinner";
const LocationList = () => {
  const { locations, setPage, hasMore, loading } = useFetchLocations();
  const [search, setSearch] = useState("");

  console.log(locations);

  const filteredLocations = locations?.filter((location: Locations) =>
    location.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

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
      <h1 className={Style.heading}>Locations of Rick & Morty</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
        text={"search locations here"}
      />
      <Spinner loading={loading} />

      <div className={Style.episode_wrapper}>
        {filteredLocations.map((location: Locations, index: number) => (
          <div key={index} className={Style.episode_card}>
            <p className={Style.episode_card_name}>{location?.name}</p>
            <Link
              to={`/characteroflocations/${location?.id}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <button className={Style.button}>View All Characters</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationList;
