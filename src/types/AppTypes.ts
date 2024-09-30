export type AppContextTypes = {
  stores: StoresType[] | null | undefined;
  setStores: (stores: StoresType[] | null) => void;
  handleAddStore: (
    name: string,
    userId: string
  ) => Promise<boolean | undefined>;
  handleGetUserStores: (userId: string) => Promise<void>;
  handleCreateItem: (
    item: ItemsType,
    storeId: string
  ) => Promise<Response | undefined>;
  userTheme: string;
  setUserTheme: (theme: string) => void;
  handleDeleteItem: (id: string) => Promise<void>;
};

export type StoresType = {
  id?: string;
  name: string;
  userId: string;
  items?: ItemsType[];
  favorites?: FavoritesType[];
};

export type ItemsType = {
  id?: string;
  name: string;
  image: string;
  description: string;
  quantity: string;
  minQuantity: string;
  storeId: string;
};

export type FavoritesType = {
  itemId: string;
  id?: string;
};
