import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import type { Recipe } from "../types";

afterEach(cleanup);

const recipe: Recipe = {
  id: "test-recipe",
  name: "Test Recipe",
  description: "A test",
  instructions: "",
  category: "Dessert",
  image_url: "https://example.com/img.jpg",
  prep_time: 10,
  cook_time: 20,
  servings: 4,
  created_by: "admin",
  published: true,
  when_to_eat: "Dinner",
};

function renderCard() {
  return render(
    <BrowserRouter>
      <RecipeCard recipe={recipe} />
    </BrowserRouter>
  );
}

describe("RecipeCard", () => {
  it("renders recipe name", () => {
    renderCard();
    expect(screen.getByText("Test Recipe")).toBeInTheDocument();
  });

  it("renders category", () => {
    renderCard();
    expect(screen.getByText("Dessert")).toBeInTheDocument();
  });

  it("renders image with correct src", () => {
    renderCard();
    const img = screen.getByAltText("Test Recipe") as HTMLImageElement;
    expect(img.src).toBe("https://example.com/img.jpg");
  });

  it("links to recipe detail page", () => {
    renderCard();
    const link = screen.getByRole("link");
    expect(link.getAttribute("href")).toBe("/recettes/test-recipe");
  });
});
