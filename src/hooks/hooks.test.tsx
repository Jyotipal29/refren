import { renderHook, waitFor } from "@testing-library/react"; // or '@testing-library/react-hooks' if you can use it
import MockAdapter from "axios-mock-adapter";
import { describe, it, expect, afterEach } from "vitest";
import axios from "axios";
import { useFetchEpisode, useFetchOneEpisode } from "./useFetchEpisode";
import {
  useFetchCharacters,
  useFetchCharacter,
  useFetchCharactersOfEpsiode,
} from "./useFetchCharacters";
import {
  useFetchLocations,
  useFetchOneLocation,
  useFetchLocation,
} from "./useFetchLocation";

const mock = new MockAdapter(axios);

describe("Hooks Tests", () => {
  afterEach(() => {
    mock.reset();
  });

  // Test for useFetchCharacters
  describe("useFetchCharacters", () => {
    it("fetches characters successfully", async () => {
      const charactersData = {
        results: [{ id: 1, name: "Rick Sanchez" }],
        info: { next: "some-url" },
      };
      mock
        .onGet("https://rickandmortyapi.com/api/character?page=1")
        .reply(200, charactersData);

      const { result } = renderHook(() => useFetchCharacters());

      await waitFor(() => {
        expect(result.current.characters).toEqual(charactersData.results);
        expect(result.current.hasMore).toBe(true);
      });
    });

    it("fetches all pages and sets hasMore to false when there are no more pages", async () => {
      const charactersData = {
        results: [{ id: 1, name: "Rick Sanchez" }],
        info: { next: null },
      };
      mock
        .onGet("https://rickandmortyapi.com/api/character?page=1")
        .reply(200, charactersData);

      const { result } = renderHook(() => useFetchCharacters());

      await waitFor(() => {
        expect(result.current.hasMore).toBe(false);
      });
    });

    it("handles error while fetching characters", async () => {
      mock.onGet("https://rickandmortyapi.com/api/character?page=1").reply(500);

      const { result } = renderHook(() => useFetchCharacters());

      await waitFor(() => {
        expect(result.current.characters).toEqual([]);
        expect(result.current.hasMore).toBe(true);
      });
    });
  });

  // Test for useFetchCharacter
  describe("useFetchCharacter", () => {
    it("fetches character by ID successfully", async () => {
      const characterData = { id: 1, name: "Rick Sanchez" };
      mock
        .onGet("https://rickandmortyapi.com/api/character/1")
        .reply(200, characterData);

      const { result } = renderHook(() => useFetchCharacter("1"));

      await waitFor(() => {
        expect(result.current.character).toEqual(characterData);
      });
    });

    it("handles error while fetching character by ID", async () => {
      mock.onGet("https://rickandmortyapi.com/api/character/1").reply(500);

      const { result } = renderHook(() => useFetchCharacter("1"));

      await waitFor(() => {
        expect(result.current.character).toBeNull();
      });
    });
  });

  // Test for useFetchCharactersOfEpsiode
  describe("useFetchCharactersOfEpsiode", () => {
    it("fetches characters of an episode successfully", async () => {
      const characterData = [{ id: 1, name: "Rick Sanchez" }];
      const characterUrl = ["https://rickandmortyapi.com/api/character/1"];
      mock.onGet(characterUrl[0]).reply(200, characterData[0]);

      const { result } = renderHook(() =>
        useFetchCharactersOfEpsiode(characterUrl)
      );

      await waitFor(() => {
        expect(result.current.characters).toEqual(characterData);
      });
    });

    it("handles error while fetching characters of an episode", async () => {
      const characterUrl = ["https://rickandmortyapi.com/api/character/1"];
      mock.onGet(characterUrl[0]).reply(500);

      const { result } = renderHook(() =>
        useFetchCharactersOfEpsiode(characterUrl)
      );

      await waitFor(() => {
        expect(result.current.characters).toEqual([]);
      });
    });
  });

  // Test for useFetchEpisode
  describe("useFetchEpisode", () => {
    it("fetches episodes successfully", async () => {
      const episodeData = [{ id: 1, name: "Pilot" }];
      const episodeUrl = ["https://rickandmortyapi.com/api/episode/1"];
      mock.onGet(episodeUrl[0]).reply(200, episodeData[0]);

      const { result } = renderHook(() => useFetchEpisode(episodeUrl));

      await waitFor(() => {
        expect(result.current.episodes).toEqual(episodeData);
      });
    });

    it("handles error while fetching episodes", async () => {
      const episodeUrl = ["https://rickandmortyapi.com/api/episode/1"];
      mock.onGet(episodeUrl[0]).reply(500);

      const { result } = renderHook(() => useFetchEpisode(episodeUrl));

      await waitFor(() => {
        expect(result.current.episodes).toEqual([]);
      });
    });
  });

  // Test for useFetchLocations
  describe("useFetchLocations", () => {
    it("fetches locations successfully", async () => {
      const locationsData = {
        results: [{ id: 1, name: "Earth" }],
        info: { next: "some-url" },
      };
      mock
        .onGet("https://rickandmortyapi.com/api/location?page=1")
        .reply(200, locationsData);

      const { result } = renderHook(() => useFetchLocations());

      await waitFor(() => {
        expect(result.current.locations).toEqual(locationsData.results);
        expect(result.current.hasMore).toBe(true);
      });
    });

    it("handles error while fetching locations", async () => {
      mock.onGet("https://rickandmortyapi.com/api/location?page=1").reply(500);

      const { result } = renderHook(() => useFetchLocations());

      await waitFor(() => {
        expect(result.current.locations).toEqual([]);
      });
    });
  });

  // Test for useFetchOneLocation
  describe("useFetchOneLocation", () => {
    it("fetches location by ID successfully", async () => {
      const locationData = { id: 1, name: "Earth" };
      mock
        .onGet("https://rickandmortyapi.com/api/location/1")
        .reply(200, locationData);

      const { result } = renderHook(() => useFetchOneLocation("1"));

      await waitFor(() => {
        expect(result.current.location).toEqual(locationData);
      });
    });

    it("handles error while fetching location by ID", async () => {
      mock.onGet("https://rickandmortyapi.com/api/location/1").reply(500);

      const { result } = renderHook(() => useFetchOneLocation("1"));

      await waitFor(() => {
        expect(result.current.location).toBeNull();
      });
    });
  });

  // Test for useFetchOneEpisode
  describe("useFetchOneEpisode", () => {
    it("fetches episode by ID successfully", async () => {
      const episodeData = { id: 1, name: "Pilot" };
      mock
        .onGet("https://rickandmortyapi.com/api/episode/1")
        .reply(200, episodeData);

      const { result } = renderHook(() => useFetchOneEpisode("1"));

      await waitFor(() => {
        expect(result.current.episode).toEqual(episodeData);
      });
    });

    it("handles error while fetching episode by ID", async () => {
      mock.onGet("https://rickandmortyapi.com/api/episode/1").reply(500);

      const { result } = renderHook(() => useFetchOneEpisode("1"));

      await waitFor(() => {
        expect(result.current.episode).toBeNull();
      });
    });
  });

  // Test for useFetchLocation
  describe("useFetchLocation", () => {
    it("fetches character location successfully", async () => {
      const character = {
        location: { url: "https://rickandmortyapi.com/api/location/1" },
      };
      const locationData = { id: 1, name: "Earth" };
      mock
        .onGet("https://rickandmortyapi.com/api/location/1")
        .reply(200, locationData);

      const { result } = renderHook(() => useFetchLocation(character as User));

      await waitFor(() => {
        expect(result.current.characterlocation).toEqual(locationData);
        expect(result.current.loading).toBe(false);
      });
    });

    it("handles error while fetching character location", async () => {
      const character = {
        location: { url: "https://rickandmortyapi.com/api/location/1" },
      };
      mock.onGet("https://rickandmortyapi.com/api/location/1").reply(500);

      const { result } = renderHook(() => useFetchLocation(character as User));

      await waitFor(() => {
        expect(result.current.characterlocation).toBeNull();
        expect(result.current.loading).toBe(false);
      });
    });
  });
});
