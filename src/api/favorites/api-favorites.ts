import { toast } from "react-toastify";

//get favs from a store

export const getFavoritesFromDB = async (storeId: string) => {
  const response = await fetch(
    `http://localhost:3000/stores/${storeId}/favorites`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const text = await response.text();
  return text ? JSON.parse(text) : [];
};

//get Fav by favId

//get favs by id
export const getFavoritesByItemId = async (itemId: string) => {
  return await fetch(`http://localhost:3000/items/${itemId}/favorite`).then(
    (response) => response.json()
  );
};

//create a fav
export const createFavorite = async (itemId: string) => {
  try {
    const favorite = {
      itemId: itemId,
    };
    return await fetch(`http://localhost:3000/items/${itemId}/favorite`, {
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

//delete fav
const deleteFavoriteById = async (favId: string) => {
  console.log({ deleteFavID: favId });
  const response = await fetch(`http://localhost:3000/favorite/${favId}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

//toggle favs
export const toggleFavorite = async (itemId: string) => {
  const favorites = await getFavoritesByItemId(itemId);

  try {
    if (favorites.length === 0) {
      return await createFavorite(itemId);
    } else {
      return await deleteFavoriteById(favorites[0].id.toString());
    }
  } catch (error) {
    console.error(error);
    toast.error("Error toggling favorite");
    return null;
  }
};
