import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { getFavorites, addFavorite, removeFavorite } from "../services/api";

export default function FavoriteButton({ recipeID }: { recipeID: string }) {
  const { user } = useAuth();
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (!user) return;
    getFavorites()
      .then((favs) => setIsFav(favs.some((f) => f.id === recipeID)))
      .catch(() => {});
  }, [user, recipeID]);

  if (!user) return null;

  async function toggle() {
    if (!user) return;
    if (isFav) {
      await removeFavorite(user.username, recipeID);
      setIsFav(false);
    } else {
      await addFavorite(user.username, recipeID);
      setIsFav(true);
    }
  }

  return (
    <button onClick={toggle} aria-label={isFav ? "remove favorite" : "add favorite"}>
      {isFav ? "❤️" : "🤍"}
    </button>
  );
}
