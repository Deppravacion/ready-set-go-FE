import { toast } from "react-toastify";
import { ItemsType } from "../../types/AppTypes";

export const getItemsByStoreId = async (userId: string, storeId: string) => {
  return await fetch(
    `http://localhost:3000/users/${userId}/stores/${storeId}/items`
  ).then((response) => response.json());
};

export const getItemById = async (itemId: string) => {
  const userId = "default to be replaced"; // grab this info but do not require it as arg if possible
  const storeId = "default to be replaced";
  try {
    const items = await getItemsByStoreId(userId, storeId);
    return items.filter((item: ItemsType) => item.id === itemId);
  } catch (error) {
    console.error(error);
    toast.error("Error fetching item");
  }
};

export const createItem = async (item: ItemsType) => {
  return await fetch("http://localhost:3004/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
};

export const increaseItemQuantity = async (itemId: string) => {
  try {
    const item = await getItemById(itemId);
    const newQuantity = Number(item[0].quantity) + 1;
    return await fetch(`http://localhost:3004/items/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: newQuantity }),
    });
  } catch (error) {
    console.error(error);
    toast.error("Error increasing item quantity");
  }
};

export const decreaseItemQuantity = async (itemId: string) => {
  try {
    const item = await getItemById(itemId);
    const newQuantity = Number(item[0].quantity) - 1;
    if (newQuantity >= 0) {
      return await fetch(`http://localhost:3004/items/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });
    } else {
      toast.error("Quantity cannot be less than 0");
    }
  } catch (error) {
    console.error(error);
    toast.error("Error decreasing item quantity");
  }
};

export const deleteItem = async (id: string) => {
  return await fetch(`http://localhost:3004/items/${id}`, {
    method: "DELETE",
  });
};
