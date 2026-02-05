import { describe, it, expect, vi, beforeEach } from "vitest";
import { getRecipes, getRecipe, login, getFavorites } from "../services/api";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

beforeEach(() => {
  mockFetch.mockReset();
});

describe("api", () => {
  it("getRecipes fetches /recipes with correct url and headers", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ id: "1", name: "test" }]),
    });

    const recipes = await getRecipes(10);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/recipes?limit=10"),
      expect.objectContaining({
        credentials: "include",
        headers: expect.objectContaining({ Accept: "application/json" }),
      })
    );
    expect(recipes).toHaveLength(1);
  });

  it("getRecipe fetches /recipes/:id", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: "abc", name: "recipe" }),
    });

    const recipe = await getRecipe("abc");
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/recipes/abc"),
      expect.anything()
    );
    expect(recipe.name).toBe("recipe");
  });

  it("login sends POST with credentials", async () => {
    mockFetch.mockResolvedValue({ ok: true });

    await login({ username: "user", password: "pass" });
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/login"),
      expect.objectContaining({
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ username: "user", password: "pass" }),
      })
    );
  });

  it("login throws on failure", async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 401 });

    await expect(login({ username: "u", password: "p" })).rejects.toThrow(
      "login failed"
    );
  });

  it("getFavorites unwraps nested recipe objects", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve([
          { recipe: { id: "a", name: "A" } },
          { recipe: { id: "b", name: "B" } },
        ]),
    });

    const favs = await getFavorites();
    expect(favs).toHaveLength(2);
    expect(favs[0].id).toBe("a");
    expect(favs[1].name).toBe("B");
  });

  it("request throws on non-ok response", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    await expect(getRecipes()).rejects.toThrow("500");
  });
});
