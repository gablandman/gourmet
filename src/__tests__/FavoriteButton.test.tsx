import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import FavoriteButton from "../components/FavoriteButton";
import { AuthContext } from "../context/authContext";
import type { AuthContextType } from "../context/authContext";

afterEach(cleanup);

vi.mock("../services/api", () => ({
  getFavorites: vi.fn(() => Promise.resolve([])),
  addFavorite: vi.fn(() => Promise.resolve()),
  removeFavorite: vi.fn(() => Promise.resolve()),
}));

function renderWithAuth(user: { username: string } | null) {
  const ctx: AuthContextType = {
    user,
    loading: false,
    login: vi.fn(),
    logout: vi.fn(),
  };
  return render(
    <AuthContext.Provider value={ctx}>
      <FavoriteButton recipeID="test-id" />
    </AuthContext.Provider>
  );
}

describe("FavoriteButton", () => {
  it("renders nothing when not logged in", () => {
    const { container } = renderWithAuth(null);
    expect(container.firstChild).toBeNull();
  });

  it("renders heart button when logged in", async () => {
    renderWithAuth({ username: "alpha" });
    await waitFor(() => {
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  it("toggles favorite on click", async () => {
    const { addFavorite } = await import("../services/api");
    renderWithAuth({ username: "alpha" });

    const btn = await screen.findByRole("button");
    fireEvent.click(btn);

    await waitFor(() => {
      expect(addFavorite).toHaveBeenCalledWith("alpha", "test-id");
    });
  });
});
