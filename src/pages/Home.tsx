import { ItemsType, StoresType } from "../types/AppTypes";
import { useAuthProvider } from "../providers/AuthContext";
import { useAppProvider } from "../providers/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { ThemeToggler } from "../theme/ThemeToggler";
import { getItemsByStoreId } from "../api/items/api-items";

type StoreCardProps = {
  store: StoresType;
};

const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  const [storeItems, setStoreItems] = useState<Record<string, ItemsType[]>>({});
  const { stores, userTheme, handleDeleteUserStore, handleGetUserStores } =
    useAppProvider();
  const userIdRef = useRef("");
  const navigate = useNavigate();
  const { user } = useAuthProvider();
  if (user && user.userInformation && user.userInformation.id) {
    userIdRef.current = user.userInformation.id;
  }

  const fetchItems = async () => {
    if (!stores) return;
    const itemsMap: Record<string, ItemsType[]> = {};
    for (const store of stores) {
      if (store.id) {
        const items = await getItemsByStoreId(store.id);
        itemsMap[store.id] = items;
      }
    }
    setStoreItems(itemsMap);
  };

  useEffect(() => {
    fetchItems();
  }, [stores, userTheme]);

  return (
    <div data-theme={userTheme} className="card shadow-sm bg-neutral p-10">
      <div className="container mx-auto p-1 bg-base-300 rounded-none">
        <h2 className="text-lg">{store.name}</h2>
      </div>
      <div className="card-body bg-base-200">
        {store.id &&
          storeItems[store.id] &&
          Array.isArray(storeItems[store.id]) &&
          storeItems[store.id].map((item, i) => {
            return (
              <div key={i} className="text-center">
                {item.name}
              </div>
            );
          })}
      </div>
      <button
        className="btn rounded-none bg-info text-info-conent"
        onClick={() => navigate(`/details/${store.id}/${store.name}`)}
      >
        expand
      </button>
      <button
        className="btn rounded-none bg-error text-info-conent"
        onClick={() =>
          handleDeleteUserStore(store.id as string).then(() =>
            handleGetUserStores(userIdRef.current)
          )
        }
      >
        delete
      </button>
    </div>
  );
};

const defaultStoreCardData = {
  store: {
    id: "nan",
    name: "Create a New Store",
    userId: "nan",
  },
};

export const Home = () => {
  const { handleLogout, user } = useAuthProvider();
  const { handleGetUserStores, userTheme, stores } = useAppProvider();
  const name = user?.userInformation.name;

  const subTitle: string = `${name}, welcome to your home page!`;
  const title: string = "Ready Set Go!";
  const navigate = useNavigate();
  const renderCount = useRef(0);
  renderCount.current += 1;

  useEffect(() => {
    if (!user) return;
    if (!user.userInformation.id) return;
    handleGetUserStores(user.userInformation.id.toString());
  }, [user]);
  console.log(`Home component render count: ${renderCount.current}`);
  return (
    <>
      <div
        data-theme={userTheme}
        className="card w-96 bg-base-100 shadow-xl m-auto p-4"
      >
        <div className="container mx-auto p-10 bg-base-300 rounded-md mb-2">
          <h2 className="text-lg">{title}</h2>
          <h2 className="text-md">{subTitle}</h2>
        </div>
        <div className="card-body max-h-[500px] overflow-y-auto">
          {stores ? (
            stores.map((store) => <StoreCard store={store} key={store.id} />)
          ) : (
            <StoreCard store={stores || defaultStoreCardData.store} />
          )}
        </div>
        <div className="flex justify-between my-[10px]">
          <button
            className="btn btn-outline rounded-none btn-error px-2"
            onClick={() => {
              handleLogout();
              navigate("/signin");
            }}
          >
            Logout
          </button>
          <button
            className="btn btn-outline rounded-none btn-primary"
            onClick={() => navigate("/home")}
          >
            Home
          </button>
          <button
            className="btn btn-outline rounded-none btn-secondary"
            onClick={() => navigate(`/createstore`)}
          >
            New
          </button>
        </div>
        <ThemeToggler />
      </div>
    </>
  );
};
