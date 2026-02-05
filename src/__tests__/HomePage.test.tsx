import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";

vi.mock("../services/api", () => ({
  getRecipes: vi.fn(() =>
    Promise.resolve([
      {
        id: "r1",
        name: "Recipe One",
        category: "Main",
        image_url: "",
        description: "",
        instructions: "",
        prep_time: 0,
        cook_time: 0,
        servings: 0,
        created_by: "",
        published: true,
        when_to_eat: "",
      },
      {
        id: "r2",
        name: "Recipe Two",
        category: "Dessert",
        image_url: "",
        description: "",
        instructions: "",
        prep_time: 0,
        cook_time: 0,
        servings: 0,
        created_by: "",
        published: true,
        when_to_eat: "",
      },
    ])
  ),
}));

describe("HomePage", () => {
  it("fetches and displays recipes", async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Recipe One")).toBeInTheDocument();
      expect(screen.getByText("Recipe Two")).toBeInTheDocument();
    });
  });
});
