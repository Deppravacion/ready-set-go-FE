import { toast } from "react-toastify";
import { FavoritesType } from "../../types/AppTypes";

export const getFavoritesFromDB = async () => {
  return await fetch(`http://localhost:3004/favorites`).then((response) =>
    response.json()
  );
};

export const getFavoritesByItemId = async (itemId: string) => {
  try {
    const favorites = await getFavoritesFromDB();
    return favorites.filter(
      (favorite: FavoritesType) => favorite.itemId === itemId
    );
  } catch (error) {
    console.error(error);
    toast.error("Error fetching favorites");
  }
};

export const createFavorite = async (favorite: FavoritesType) => {
  try {
    return await fetch("http://localhost:3004/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(favorite),
    });
  } catch (error) {
    console.error(error);
    toast.error("Error creating favorite");
  }
};

export const deleteFavoriteById = async (id: string) => {
  return await fetch(`http://localhost:3004/favorites/${id}`, {
    method: "DELETE",
  });
};

export const toggleFavorite = async (itemId: string) => {
  const favorites = await getFavoritesByItemId(itemId);
  console.log(itemId, favorites);
  try {
    if (favorites.length === 0) {
      console.log("no favorites");
      const newFavorite = {
        itemId,
      };
      return await createFavorite(newFavorite);
    } else {
      return await deleteFavoriteById(favorites[0].id);
    }
  } catch (error) {
    console.error(error);
    toast.error("Error toggling favorite");
  }
};
