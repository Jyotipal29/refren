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
