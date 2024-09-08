import { renderHook, waitFor, act } from "@testing-library/react"; // or '@testing-library/react-hooks' if you can use it
import MockAdapter from "axios-mock-adapter";
import { describe, it, expect, afterEach } from "vitest";
import axios from "axios";
import {
  useFetchEpisode,
  useFetchOneEpisode,
  useFetchEpisodes,
} from "./useFetchEpisode";
import {
  useFetchCharacters,
  useFetchCharacter,
  useFetchCharactersOfEpisode,
  useFetchCharactersOfLocation,
} from "./useFetchCharacters";
import {
  useFetchLocations,
  useFetchOneLocation,
  useFetchLocation,
} from "./useFetchLocation";

const mock = new MockAdapter(axios);
describe("Custom Hooks Tests", () => {
  afterEach(() => {
    mock.reset();
  });

  // Test useFetchCharacters
  it("useFetchCharacters fetches characters and handles pagination", async () => {
    const mockData = {
      results: [{ id: 1, name: "Rick Sanchez" }],
      info: { next: "nextPageUrl" },
    };
    mock
      .onGet("https://rickandmortyapi.com/api/character?page=1")
      .reply(200, mockData);

    const { result } = renderHook(() => useFetchCharacters());

    await act(async () => {
      await result.current.setPage(1); // Trigger the hook to fetch data
    });

    await waitFor(() => {
      expect(result.current.characters).toEqual(mockData.results);
      expect(result.current.hasMore).toBe(true);
      expect(result.current.loading).toBe(false);
    });
  });

  // Test useFetchCharacter
  it("useFetchCharacter fetches a character by ID", async () => {
    const mockData = { id: 1, name: "Rick Sanchez" };
    mock
      .onGet("https://rickandmortyapi.com/api/character/1")
      .reply(200, mockData);

    const { result } = renderHook(() => useFetchCharacter("1"));

    await waitFor(() => {
      expect(result.current.character).toEqual(mockData);
      expect(result.current.loading).toBe(false);
    });
  });

  // Test useFetchCharactersOfLocation
  it("useFetchCharactersOfLocation fetches characters of a location", async () => {
    const mockData = { id: 1, name: "Rick Sanchez" };
    const mockLocation = {
      id: 1,
      name: "Earth",
      dimension: "Dimension C-137",
      type: "Planet",
      residents: ["https://rickandmortyapi.com/api/character/1"],
      url: "https://rickandmortyapi.com/api/location/1",
      created: "2017-11-04T18:48:46.250Z",
    };
    mock
      .onGet("https://rickandmortyapi.com/api/character/1")
      .reply(200, mockData);

    const { result } = renderHook(() =>
      useFetchCharactersOfLocation(mockLocation)
    );

    await waitFor(() => {
      expect(result.current.characters).toEqual([mockData]);
      expect(result.current.loading).toBe(false);
    });
  });

  // Test useFetchCharactersOfEpisode
  it("useFetchCharactersOfEpisode fetches characters of an episode", async () => {
    const mockData = { id: 1, name: "Rick Sanchez" };
    const mockEpisode: Episode = {
      id: 1,
      name: "Pilot",
      air_date: "December 2, 2013",
      episode: "S01E01",
      characters: ["https://rickandmortyapi.com/api/character/1"],
      url: "https://rickandmortyapi.com/api/episode/1",
      created: "2017-11-10T12:56:33.798Z",
    };
    mock
      .onGet("https://rickandmortyapi.com/api/character/1")
      .reply(200, mockData);

    const { result } = renderHook(() =>
      useFetchCharactersOfEpisode(mockEpisode)
    );

    await waitFor(() => {
      expect(result.current.characters).toEqual([mockData]);
      expect(result.current.loading).toBe(false);
    });
  });

  // Test useFetchEpisode
  it("useFetchEpisode fetches episodes for a character", async () => {
    const mockData = { id: 1, name: "Pilot" };
    const mockCharacter = {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: {
        name: "Earth",
        url: "https://rickandmortyapi.com/api/location/1",
      },
      location: {
        name: "Earth",
        url: "https://rickandmortyapi.com/api/location/1",
      },
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      episode: ["https://rickandmortyapi.com/api/episode/1"],
      url: "https://rickandmortyapi.com/api/character/1",
      created: "2017-11-04T18:48:46.250Z",
    };
    mock
      .onGet("https://rickandmortyapi.com/api/episode/1")
      .reply(200, mockData);

    const { result } = renderHook(() => useFetchEpisode(mockCharacter));

    await waitFor(() => {
      expect(result.current.episodes).toEqual([mockData]);
      expect(result.current.loading).toBe(false);
    });
  });

  // Test useFetchEpisodes
  it("useFetchEpisodes fetches episodes with pagination", async () => {
    const mockData = {
      results: [{ id: 1, name: "Pilot" }],
      info: { next: "nextPageUrl" },
    };
    mock
      .onGet("https://rickandmortyapi.com/api/episode?page=1")
      .reply(200, mockData);

    const { result } = renderHook(() => useFetchEpisodes());

    await waitFor(() => {
      expect(result.current.episodess).toEqual(mockData.results);
      expect(result.current.hasMore).toBe(true);
      expect(result.current.loading).toBe(false);
    });
  });

  // Test useFetchOneEpisode
  it("useFetchOneEpisode fetches a single episode by ID", async () => {
    const mockData = { id: 1, name: "Pilot" };
    mock
      .onGet("https://rickandmortyapi.com/api/episode/1")
      .reply(200, mockData);

    const { result } = renderHook(() => useFetchOneEpisode("1"));

    await waitFor(() => {
      expect(result.current.episode).toEqual(mockData);
      expect(result.current.loading).toBe(false);
    });
  });

  // Test useFetchLocation
  it("useFetchLocation fetches the location of a character", async () => {
    const mockData = { id: 1, name: "Earth" };
    const mockCharacter = {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: {
        name: "Earth",
        url: "https://rickandmortyapi.com/api/location/1",
      },
      location: {
        name: "Earth",
        url: "https://rickandmortyapi.com/api/location/1",
      },
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      episode: ["https://rickandmortyapi.com/api/episode/1"],
      url: "https://rickandmortyapi.com/api/character/1",
      created: "2017-11-04T18:48:46.250Z",
    };
    mock
      .onGet("https://rickandmortyapi.com/api/location/1")
      .reply(200, mockData);

    const { result } = renderHook(() => useFetchLocation(mockCharacter));

    await waitFor(() => {
      expect(result.current.characterlocation).toEqual(mockData);
      expect(result.current.loading).toBe(false);
    });
  });

  // Test useFetchLocations
  it("useFetchLocations fetches locations with pagination", async () => {
    const mockData = {
      results: [{ id: 1, name: "Earth" }],
      info: { next: "nextPageUrl" },
    };
    mock
      .onGet("https://rickandmortyapi.com/api/location?page=1")
      .reply(200, mockData);

    const { result } = renderHook(() => useFetchLocations());

    await waitFor(() => {
      expect(result.current.locations).toEqual(mockData.results);
      expect(result.current.hasMore).toBe(true);
      expect(result.current.loading).toBe(false);
    });
  });

  // Test useFetchOneLocation
  it("useFetchOneLocation fetches a single location by ID", async () => {
    const mockData = { id: 1, name: "Earth" };
    mock
      .onGet("https://rickandmortyapi.com/api/location/1")
      .reply(200, mockData);

    const { result } = renderHook(() => useFetchOneLocation("1"));

    await waitFor(() => {
      expect(result.current.location).toEqual(mockData);
      expect(result.current.loading).toBe(false);
    });
  });
});
