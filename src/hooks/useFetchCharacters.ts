import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchCharacters = () => {
  const [characters, setCharacters] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // To track if there's more data to load
  // useEffect(() => {
  //   const getCharacters = async () => {
  //     const res = await axios.get("https://rickandmortyapi.com/api/character");
  //     console.log(res.data.results);
  //     setCharacters(res.data.results);
  //   };

  //   getCharacters();
  // }, []);

  useEffect(() => {
    const getCharacters = async () => {
      if (loading) return; // Prevent duplicate requests

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
        if (res.data.info.next === null) {
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

  useEffect(() => {
    const getCharacterById = async (id: string) => {
      const res = await axios.get(
        `https://rickandmortyapi.com/api/character/${id}`
      );

      setCharacter(res.data);
    };
    getCharacterById(id);
  }, [id]);

  return { character };
};
