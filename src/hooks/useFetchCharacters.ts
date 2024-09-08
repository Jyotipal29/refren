import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchCharacters = () => {
  const [characters, setCharacters] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const getCharacters = async () => {
      if (loading) return;

      setLoading(true);
      try {
        const res = await axios.get(
          `https://rickandmortyapi.com/api/character?page=${page}`
        );
        setCharacters((prevCharacters) => [
          ...prevCharacters,
          ...res.data.results,
        ]);

        // If there are no more pages, set `hasMore` to false
        if (res?.data?.info?.next === null) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setLoading(false);
      }
    };

    getCharacters();
  }, [page]);

  return { characters, setPage, hasMore, loading };
};
export const useFetchCharacter = (id: string) => {
  const [character, setCharacter] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getCharacterById = async (id: string) => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://rickandmortyapi.com/api/character/${id}`
        );

        setCharacter(res?.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getCharacterById(id);
  }, [id]);

  return { character, loading };
};

export const useFetchCharactersOfEpsiode = (characterUrl: string[]) => {
  const [characters, setCharacters] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getEpisodes = async () => {
      try {
        setLoading(true);
        const responses = await Promise.all(
          characterUrl?.map((url) => axios.get(url))
        );
        const episodeCharacterData = responses?.map((res) => res?.data);
        setCharacters(episodeCharacterData);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    if (characterUrl?.length > 0) {
      getEpisodes();
    }
  }, [characterUrl]);

  return {
    characters,
    loading,
  };
};