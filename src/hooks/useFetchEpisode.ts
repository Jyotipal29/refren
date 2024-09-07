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
