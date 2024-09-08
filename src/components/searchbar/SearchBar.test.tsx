import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SearchBar from "."; // Adjust import path if necessary

// Mock the CSS module import (if needed)
vi.mock("../searchbar.module.css", () => ({
  searchBar: "searchBar",
  input: "input",
}));

describe("SearchBar Component", () => {
  it("should render the input field with the correct placeholder text", () => {
    render(<SearchBar search="" setSearch={() => {}} text="Search here" />);

    // Check if the input field is rendered with the correct placeholder
    const inputElement = screen.getByPlaceholderText("Search here");
    expect(inputElement).toBeInTheDocument();
  });

  it("should display the correct value in the input field", () => {
    render(
      <SearchBar search="Test Search" setSearch={() => {}} text="Search here" />
    );

    // Check if the input field displays the correct value
    const inputElement = screen.getByDisplayValue("Test Search");
    expect(inputElement).toBeInTheDocument();
  });

  it("should call setSearch when input value changes", () => {
    const setSearchMock = vi.fn();
    render(
      <SearchBar search="" setSearch={setSearchMock} text="Search here" />
    );

    // Simulate typing in the input field
    const inputElement = screen.getByPlaceholderText("Search here");
    fireEvent.change(inputElement, { target: { value: "New Search" } });

    // Check if setSearch was called with the correct value
    expect(setSearchMock).toHaveBeenCalledWith("New Search");
  });
});
