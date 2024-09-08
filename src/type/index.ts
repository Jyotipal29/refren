export {};
declare global {
  type User = {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
      name: string;
      url: string;
    };
    location: {
      name: string;
      url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
  };

  type Episode = {
    id: number;
    air_date: string;
    created: string;
    spisode: string;
    name: string;
    url: string;
    characters: string[];
  };

  type Locations = {
    id: number;
    created: string;
    dimension: string;
    name: string;
    type: string;
    url: string;
    residents: string[];
  };

  interface FilterOption {
    label: string;
    value: string;
  }

  type FilterProps = {
    selectedStatus: string | null;
    selectedGender: string | null;
    selectedSpecies: string | null;
    setSelectedSpecies: (species: string) => void;
    setSelectedStatus: (status: string) => void;
    setSelectedGender: (gender: string) => void;
  };

  type SearchProps = {
    search: string;
    setSearch: (search: string) => void;
    text: string;
  };
}
