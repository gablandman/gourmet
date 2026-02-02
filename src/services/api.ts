import type { Recipe, User, LoginCredentials } from "../types";

const BASE_URL = import.meta.env.DEV
  ? "/api"
  : "https://gourmet.cours.quimerch.com";

const JSON_HEADERS = {
  Accept: "application/json",
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: "include",
    headers: { ...JSON_HEADERS },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  return res.json();
}

export function getRecipes(limit = 50): Promise<Recipe[]> {
  return request<Recipe[]>(`/recipes?limit=${limit}`);
}

export function getRecipe(id: string): Promise<Recipe> {
  return request<Recipe>(`/recipes/${id}`);
}

export async function login(credentials: LoginCredentials): Promise<void> {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    credentials: "include",
    headers: { ...JSON_HEADERS, "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error("login failed");
}

export async function logout(): Promise<void> {
  await fetch(`${BASE_URL}/logout`, {
    credentials: "include",
    headers: { ...JSON_HEADERS },
  });
}

export function getMe(): Promise<User> {
  return request<User>("/me");
}

export async function getFavorites(): Promise<Recipe[]> {
  const rows = await request<{ recipe: Recipe }[]>("/favorites");
  return rows.map((r) => r.recipe);
}

export async function addFavorite(
  username: string,
  recipeID: string
): Promise<void> {
  const res = await fetch(
    `${BASE_URL}/users/${username}/favorites?recipeID=${recipeID}`,
    { method: "POST", credentials: "include", headers: { ...JSON_HEADERS } }
  );
  if (!res.ok) throw new Error("failed to add favorite");
}

export async function removeFavorite(
  username: string,
  recipeID: string
): Promise<void> {
  const res = await fetch(
    `${BASE_URL}/users/${username}/favorites?recipeID=${recipeID}`,
    { method: "DELETE", credentials: "include", headers: { ...JSON_HEADERS } }
  );
  if (!res.ok) throw new Error("failed to remove favorite");
}
