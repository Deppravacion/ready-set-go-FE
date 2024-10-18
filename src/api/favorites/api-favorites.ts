import { toast } from "react-toastify";
// import { FavoritesType } from "../../types/AppTypes";

//get favs from a store
export const getFavoritesFromDB = async (userId: string, storeId: string) => {
  return await fetch(
    `http://localhost:3000/users/${userId}/stores/${storeId}/favorites`
  ).then((response) =>
    // return await fetch(`http://localhost:3000/users/${userId}/stores/${storeId}/items/${itemId}/favorite`).then((response) =>
    response.json()
  );
};

//get Fav by favId

//get favs by id
export const getFavoritesByItemId = async (
  // userId: string,
  // storeId: string,
  itemId: string
) => {
  return await fetch(`http://localhost:3000/items/${itemId}/favorite`).then(
    (response) => response.json()
  );
};

//create a fav
export const createFavorite = async (
  // userId: string,
  // storeId: string,
  itemId: string
) => {
  // export const createFavorite = async (favorite: FavoritesType) => {
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

//he gone a fav
//the front end is not refetching/ re rendering after delete
// export const deleteFavoriteById = async (favId: string) => {

// export const deleteFavoriteById = async (itemId: string) => {
//   console.log({ deleteFavID: favId });
//   const favorites = await getFavoritesByItemId(itemId);

//   return await fetch(`http://localhost:3000/items/${itemId}/favorite`, {
//     method: "DELETE",
//   }).then(() => console.log("it should be deleted"));
// };

//toggle favs underContruction/ refactor
export const toggleFavorite = async (itemId: string) => {
  const favorites = await getFavoritesByItemId(itemId);
  const deleteFavoriteById = async (favId: string) => {
    console.log({ deleteFavID: favId });
    return await fetch(`http://localhost:3000/favorite/${favId}`, {
      method: "DELETE",
    }).then(() => console.log("it should be deleted"));
  };
  try {
    if (favorites.length === 0) {
      console.log("no favorites");
      return await createFavorite(itemId);
    } else {
      console.log({ toggleFavs: favorites[0] });
      return await deleteFavoriteById(favorites[0].id.toString());
    }
  } catch (error) {
    console.error(error);
    toast.error("Error toggling favorite");
    return [];
  }
};
