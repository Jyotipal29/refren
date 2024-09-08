import { render, screen, fireEvent } from "@testing-library/react";
import FilterBar from "./index";
// import { vi } from "vitest";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the CSS module
vi.mock("./filter.module.css", () => ({
  default: {
    filterBar: "filterBar",
    filterCategory: "filterCategory",
    filterOption: "filterOption",
  },
}));

describe("FilterBar Component", () => {
  const mockSetSelectedSpecies = vi.fn();
  const mockSetSelectedStatus = vi.fn();
  const mockSetSelectedGender = vi.fn();

  const setup = () =>
    render(
      <FilterBar
        setSelectedSpecies={mockSetSelectedSpecies}
        setSelectedStatus={mockSetSelectedStatus}
        setSelectedGender={mockSetSelectedGender}
        selectedStatus="alive"
        selectedGender="male"
        selectedSpecies="human"
      />
    );

  beforeEach(() => {
    // Clear all mock function calls before each test
    vi.clearAllMocks();
  });

  it("renders the FilterBar component correctly", () => {
    setup();

    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Gender")).toBeInTheDocument();
    expect(screen.getByText("Species")).toBeInTheDocument();
  });

  it("renders radio buttons with correct default selections", () => {
    setup();

    expect(screen.getByLabelText("Alive")).toBeChecked();
    expect(screen.getByLabelText("Male")).toBeChecked();
    expect(screen.getByLabelText("Human")).toBeChecked();
  });

  it("calls setSelectedStatus when status is changed", () => {
    setup();

    const deadRadio = screen.getByLabelText("Dead");
    fireEvent.click(deadRadio);

    expect(mockSetSelectedStatus).toHaveBeenCalledWith("dead");
  });

  it("calls setSelectedGender when gender is changed", () => {
    setup();

    const femaleRadio = screen.getByLabelText("Female");
    fireEvent.click(femaleRadio);

    expect(mockSetSelectedGender).toHaveBeenCalledWith("female");
  });

  it("calls setSelectedSpecies when species is changed", () => {
    setup();

    const alienRadio = screen.getByLabelText("Alien");
    fireEvent.click(alienRadio);

    expect(mockSetSelectedSpecies).toHaveBeenCalledWith("alien");
  });
});
