import { toast } from "react-toastify";
import { ItemsType } from "../../types/AppTypes";

export const getItemsByStoreId = async (storeId: string) => {
  return await fetch(`http://localhost:3000/stores/${storeId}/items`).then(
    (response) => response.json()
  );
};

//under construction
export const getItemById = async (itemId: string) => {
  try {
    return await fetch(`http://localhost:3000/items/${itemId}`).then(
      (response) => response.json()
    );
  } catch (error) {
    console.error(error);
    toast.error("Error fetching item");
  }
};

export const createItem = async (item: ItemsType) => {
  return await fetch("http://localhost:3000/items", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
};

export const increaseItemQuantity = async (itemId: string) => {
  try {
    const item: ItemsType = await getItemById(itemId);

    const newQuantity = Number(item.quantity) + 1;
    return await fetch(`http://localhost:3000/items/${itemId}`, {
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
    const item: ItemsType = await getItemById(itemId);
    const newQuantity = Number(item.quantity) - 1;
    if (newQuantity >= 0) {
      return await fetch(`http://localhost:3000/items/${itemId}`, {
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
  return await fetch(`http://localhost:3000/items/${id}`, {
    method: "DELETE",
  });
};
