import { useContext, createContext, useState, useEffect } from "react";
import { AppContextTypes, ItemsType, StoresType } from "../types/AppTypes";
import { toast } from "react-toastify";
import { createStore, getUserStores } from "../api/stores/api-stores";
import { useAuthProvider } from "./AuthContext";
import {
  createItem,
  deleteItem,
  getItemsByStoreId,
} from "../api/items/api-items";

export const AppContext = createContext({} as AppContextTypes);
export const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [stores, setStores] = useState<StoresType[] | null>();
  const [userTheme, setUserTheme] = useState("business");
  const { user } = useAuthProvider();

  const handleGetUserStores = async (userId: string) => {
    try {
      const userStores = await getUserStores(userId);
      setStores(userStores);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching stores");
    }
  };

  const handleAddStore = async (name: string, userId: string) => {
    const newStore = {
      name,
      userId,
    };
    try {
      return createStore(newStore);
    } catch (error) {
      console.error(error);
      toast.error("Error creating store");
    }
  };

  const handleCreateItem = async (item: ItemsType) => {
    console.log("handleCreateItem  under construction");
    // const items = await getItemsByStoreId(storeId);
    const userId = "required: find the userId";
    const storeId = "required: find the userId";
    const items = await getItemsByStoreId(userId, storeId);
    if (
      items.some(
        (elm: ItemsType) => elm.name.toLowerCase() === item.name.toLowerCase()
      )
    )
      toast.error("Item already exists");
    try {
      const newItem = {
        name: item.name,
        image: item.image,
        description: item.description,
        quantity: item.quantity,
        minQuantity: item.minQuantity,
        storeId: storeId,
      };
      return await createItem(newItem);
    } catch (error) {
      console.error(error);
      toast.error("Error creating item");
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteItem(id);
    } catch (error) {
      console.error(error);
      toast.error("Error deleting item");
    }
  };

  useEffect(() => {
    if (!user) return;
    if (!user.userInformation.id) return;
    handleGetUserStores(user.userInformation.id);
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        stores,
        setStores,
        handleAddStore,
        handleGetUserStores,
        handleCreateItem,
        handleDeleteItem,
        userTheme,
        setUserTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useAppProvider = () => useContext(AppContext);
