import { useEffect, useState } from "react";
import axios from "axios";
export const useFetchLocation = (character: User) => {
  const [characterlocation, setCharacterLocation] = useState<Locations | null>(
    null
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getLocation = async () => {
      try {
        setLoading(true);
        const response = await axios.get(character?.location?.url);
        setCharacterLocation(response?.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    getLocation();
  }, [character]);

  return {
    characterlocation,
    loading,
  };
};
export const useFetchLocations = () => {
  const [locations, setLocations] = useState<Locations[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    const getLocation = async () => {
      if (loading) return; // Prevent duplicate requests

      try {
        setLoading(true);
        const response = await axios.get(
          `https://rickandmortyapi.com/api/location?page=${page}`
        );
        // setLocations(response?.data?.results);

        setLocations((prevLocation) => [
          ...prevLocation,
          ...response.data.results,
        ]);

        if (response?.data?.info?.next === null) {
          setHasMore(false);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    getLocation();
  }, [page]);

  return {
    locations,
    setPage,
    hasMore,
    loading,
  };
};

export const useFetchOneLocation = (id: string) => {
  const [location, setLocation] = useState<Locations | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getEpisode = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://rickandmortyapi.com/api/location/${id}`
        );

        setLocation(res?.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    getEpisode();
  }, [id]);

  return {
    location,
    loading,
  };
};