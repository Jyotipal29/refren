import { useEffect, useState } from "react";
import axios from "axios";
export const useFetchEpisode = (episodeUrl: string[]) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  useEffect(() => {
    const getEpisodes = async () => {
      const responses = await Promise.all(
        episodeUrl.map((url) => axios.get(url))
      );
      const episodeData = responses.map((res) => res?.data);
      setEpisodes(episodeData);
    };
    if (episodeUrl.length > 0) {
      getEpisodes();
    }
  }, [episodeUrl]);

  return {
    episodes,
  };
};

export const useFetchEpisodes = () => {
  const [episodess, setEpisodess] = useState<Episode[]>([]);
  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  console.log(page, "page");
  useEffect(() => {
    const getEpisodes = async () => {
      // if (loading) return;
      setLoading(true);

      
        const res = await axios.get(
          `https://rickandmortyapi.com/api/episode?page=${page}`
        );

        console.log(res, "res");
        setEpisodess((prevEpisode) => [...prevEpisode, ...res.data.results]);

        // If there are no more pages, set `hasMore` to false
        if (res?.data?.info?.next === null) {
          setHasMore(false);
        }

        setLoading(false);
      
    };
    getEpisodes();
  }, [page]);

  return {
    episodess,
    setPage,
    hasMore,
    loading,
  };

  // useEffect(() => {
  //   const getEpisodes = async () => {
  //     const res = await axios.get("https://rickandmortyapi.com/api/episode");
  //     setEpisodes(res.data.results);
  //   };
  //   getEpisodes();
  // }, []);

  // return {
  //   episodes,
  // };
};

export const useFetchOneEpisode = (id: string) => {
  const [episode, setEpisode] = useState<Episode | null>(null);

  useEffect(() => {
    const getEpisode = async () => {
      const res = await axios.get(
        `https://rickandmortyapi.com/api/episode/${id}`
      );

      setEpisode(res.data);
    };

    getEpisode();
  }, [id]);

  return {
    episode,
  };
};