import { useEffect, useState } from "react";
import axios from "axios";
export const useFetchLocation = (locationUrl: string) => {
  const [location, setLocation] = useState<Locations | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      const response = await axios.get(locationUrl);
      console.log(response?.data, "res");
      setLocation(response?.data);
    };

    getLocation();
  }, [locationUrl]);

  return {
    location,
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

      setLoading(true);
      const response = await axios.get(
        `https://rickandmortyapi.com/api/location?page=${page}`
      );
      // setLocations(response?.data?.results);

      setLocations((prevLocation) => [
        ...prevLocation,
        ...response.data.results,
      ]);

      if (response.data.info.next === null) {
        setHasMore(false);
      }
      setLoading(false);
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

  useEffect(() => {
    const getEpisode = async () => {
      const res = await axios.get(
        `https://rickandmortyapi.com/api/location/${id}`
      );

      setLocation(res.data);
    };

    getEpisode();
  }, [id]);

  return {
    location,
  };
};