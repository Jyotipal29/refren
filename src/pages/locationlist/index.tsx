import { useFetchLocations } from "../../hooks/useFetchLocation";
import Style from "./locationlist.module.css";
import SearchBar from "../../components/searchbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      <SearchBar
        search={search}
        setSearch={setSearch}
        text={"search locations here"}
      />
      <div className={Style.episode_wrapper}>
        {filteredLocations.map((location: Locations, index: number) => (
          <Link
            to={`/characteroflocations/${location?.id}`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <div key={index} className={Style.episode_card}>
              <p className={Style.episode_card_name}>{location?.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LocationList;
