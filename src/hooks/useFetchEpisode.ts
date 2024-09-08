import { useEffect, useState } from "react";
import axios from "axios";
export const useFetchEpisode = (episodeUrl: string[]) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const getEpisodes = async () => {
      try {
        setLoading(true);
        const responses = await Promise.all(
          episodeUrl?.map((url) => axios.get(url))
        );
        const episodeData = responses?.map((res) => res?.data);
        setEpisodes(episodeData);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    if (episodeUrl?.length > 0) {
      getEpisodes();
    }
  }, [episodeUrl]);

  return {
    episodes,
    loading,
  };
};

export const useFetchEpisodes = () => {
  const [episodess, setEpisodess] = useState<Episode[]>([]);
  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  console.log(page, "page");
  useEffect(() => {
    const getEpisodes = async () => {
      if (loading) return;

      try {
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
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getEpisodes();
  }, [page]);

  return {
    episodess,
    setPage,
    hasMore,
    loading,
  };
};

export const useFetchOneEpisode = (id: string) => {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const getEpisode = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://rickandmortyapi.com/api/episode/${id}`
        );

        setEpisode(res?.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    getEpisode();
  }, [id]);

  return {
    episode,
    loading,
  };
};