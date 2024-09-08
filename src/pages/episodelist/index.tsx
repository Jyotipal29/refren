import { useEffect, useState } from "react";
import SearchBar from "../../components/searchbar";
import { useFetchEpisodes } from "../../hooks/useFetchEpisode";
import Style from "./episodelist.module.css";
import { Link } from "react-router-dom";
import Spinner from "../../components/spinner";
const EpisodeList = () => {
  const [search, setSearch] = useState("");
  const { episodess, setPage, hasMore, loading } = useFetchEpisodes();

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

  const filteredEpisodes = episodess?.filter((episode: Episode) =>
    episode?.name?.toLowerCase().includes(search?.trim().toLowerCase())
  );

  return (
    <div className={Style.container}>
      <h1 className={Style.heading}>Episodes of Rick & Morty</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
        text={"search episodes here"}
      />
      <Spinner loading={loading} />

      <div className={Style.episode_wrapper}>
        {filteredEpisodes?.map((episode: Episode, index: number) => (
          <div key={index} className={Style.episode_card}>
            <p className={Style.episode_card_name}>{episode?.name}</p>

            <Link
              to={`/characterofepisode/${episode?.id}`}
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

export default EpisodeList;
