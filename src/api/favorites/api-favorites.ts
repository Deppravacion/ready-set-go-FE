import { toast } from "react-toastify";
import { FavoritesType } from "../../types/AppTypes";

//get favs from a store
export const getFavoritesFromDB = async (userId: string, storeId: string) => {
  return await fetch(
    `http://localhost:3000/users/${userId}/stores/${storeId}/favorites`
  ).then((response) =>
    // return await fetch(`http://localhost:3000/users/${userId}/stores/${storeId}/items/${itemId}/favorite`).then((response) =>
    response.json()
  );
};

//get favs by id
export const getFavoritesByItemId = async (
  userId: string,
  storeId: string,
  itemId: string
) => {
  return await fetch(
    `http://localhost:3000/users/${userId}/stores/${storeId}/items/${itemId}/favorite`
  ).then((response) => response.json());
};

//create a fav
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

//he gone a fav
export const deleteFavoriteById = async (
  userId: string,
  storeId: string,
  itemId: string
) => {
  return await fetch(
    `http://localhost:3000/users/${userId}/stores/${storeId}/items/${itemId}/favorite`,
    {
      method: "DELETE",
    }
  );
};

export const toggleFavorite = async (
  userId: string,
  storeId: string,
  itemId: string
) => {
  const favorites = await getFavoritesByItemId(userId, storeId, itemId);
  console.log(itemId, favorites);
  try {
    if (favorites.length === 0) {
      console.log("no favorites");
      const newFavorite = {
        itemId,
      };
      return await createFavorite(newFavorite);
    } else {
      return await deleteFavoriteById(userId, storeId, favorites[0].id);
    }
  } catch (error) {
    console.error(error);
    toast.error("Error toggling favorite");
  }
};
