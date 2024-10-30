import { useNavigate, useParams } from "react-router-dom";
import { useAuthProvider } from "../providers/AuthContext";
import { useAppProvider } from "../providers/AppContext";
import { FavoritesType, ItemsType } from "../types/AppTypes";
import { useEffect, useState } from "react";
import {
  decreaseItemQuantity,
  getItemsByStoreId,
  increaseItemQuantity,
} from "../api/items/api-items";
import {
  getFavoritesFromDB,
  toggleFavorite,
} from "../api/favorites/api-favorites";

type CardProps = {
  userId: string;
  storeId: string;
  item: ItemsType;
  fetchItems: () => void;
  favorites?: FavoritesType[];
  fetchFavorites: () => void;
};

const CollapseItem: React.FC<CardProps> = ({
  userId,
  storeId,
  item,
  fetchItems,
  fetchFavorites,
  favorites,
}) => {
  const { id, name, image, description, quantity, minQuantity } = item;
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    console.log({ isFavoriteMessage: isFavorite });
    setIsFavorite(!!(favorites && favorites.some((fav) => fav.itemId === id)));
  }, [favorites, id]);

  return (
    <>
      <div
        className={`collapse collapse-arrow bg-base-200 ${
          isFavorite ? "ring-2 ring-red-500" : ""
        } `}
      >
        <input type="checkbox" className="peer" />
        <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
          name: {name}
        </div>
        <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={image} />
            </div>
          </div>
          <p>{description}</p>
          <p>quantity: {quantity}</p>
          <p>minimum quantity: {minQuantity} </p>
          <ItemsInterface
            userId={userId}
            storeId={storeId}
            item={item}
            fetchItems={fetchItems}
            fetchFavorites={fetchFavorites}
            favorites={favorites}
          />
        </div>
      </div>
    </>
  );
};

const ItemsInterface: React.FC<CardProps> = ({
  item,
  fetchItems,
  fetchFavorites,
}) => {
  const { handleDeleteItem } = useAppProvider();
  const handleItemQuantityUp = async (item: ItemsType) => {
    if (item && item.id) {
      return await increaseItemQuantity(item.id).then(() => fetchItems());
    }
  };
  const handleItemQuantityDown = async (item: ItemsType) => {
    if (item && item.id) {
      return await decreaseItemQuantity(item.id).then(() => fetchItems());
    }
  };
  const deleteItem = () => {
    if (!item) return;
    if (!item.id) return;
    handleDeleteItem(item.id).then(() => fetchItems());
  };

  const handleToggleFavorite = async () => {
    if (item.id) {
      await toggleFavorite(item.id);
    }
    fetchFavorites();
  };

  return (
    <>
      {item && item.id && (
        <>
          <div className="flex  gap-1 flex-col justify-center text-2xl mb-1 p-4">
            <button
              className="btn btn-info flex btn-sm min-w-16 text-2xl items-center leading-none"
              onMouseDown={() => handleItemQuantityUp(item)}
            >
              +
            </button>
            <button
              className="btn  btn-warning btn-sm min-w-16 text-2xl items-center leading-none"
              onMouseDown={() => handleItemQuantityDown(item)}
            >
              -
            </button>
          </div>
          <div className="flex justify-around">
            <button
              className="btn btn-error btn-sm min-w-16"
              onMouseDown={() => deleteItem()}
            >
              Delete
            </button>
            <button
              className="btn btn-success btn-sm min-w-16"
              onMouseDown={() => handleToggleFavorite()}
            >
              Fav
            </button>
          </div>
        </>
      )}
    </>
  );
};

export const Details = () => {
  const navigate = useNavigate();
  const { handleLogout, user } = useAuthProvider();
  const { userTheme } = useAppProvider();
  const { storeId, storeName } = useParams();
  const [storeItems, setStoreItems] = useState<ItemsType[]>();
  const [favoriteItems, setFavoriteItems] = useState<FavoritesType[]>();

  const fetchItems = async () => {
    if (user && storeId) {
      const userId = user.userInformation.id;
      if (userId && storeId) {
        const items = await getItemsByStoreId(storeId);
        if (items) {
          setStoreItems(items);
          console.log("Details-tsx below:");
          console.log({ setStoreItems: items });
        }
      }
    }
  };
  const fetchFavorites = async () => {
    if (user && storeId) {
      const favorites = await getFavoritesFromDB(storeId!);
      console.log({ settingFav: favorites });
      setFavoriteItems(favorites);
    }
  };

  useEffect(() => {
    if (user && storeId) {
      fetchItems();
      fetchFavorites();
    }
  }, [user, storeId]);

  return (
    <>
      <div
        data-theme={userTheme}
        className="card w-96 bg-base-100 shadow-xl m-auto p-4"
      >
        <div className="container mx-auto p-10 bg-accent rounded-md ">
          <h2 className="text-lg">{storeName}</h2>
          <h2 className="text-md">{`Details for the store: ${storeName}`}</h2>
        </div>

        <div className="card-body">
          {/* ******** */}
          {Array.isArray(storeItems) && storeItems.length > 0 ? (
            storeItems.map((item, i) => (
              <CollapseItem
                key={i}
                userId={user?.userInformation.id ?? ""}
                storeId={storeId!}
                item={item}
                fetchItems={fetchItems}
                fetchFavorites={fetchFavorites}
                favorites={favoriteItems}
              />
            ))
          ) : (
            <div>No Items - Add your first item</div>
          )}
          {/* ******** */}
        </div>

        <div className="flex justify-between my-[10px]">
          <button
            className="btn btn-outline rounded-none btn-warning px-2"
            onClick={() => {
              handleLogout();
              navigate("/signin");
            }}
          >
            Logout
          </button>
          <button
            className="btn btn-outline rounded-none btn-success"
            onClick={() => navigate("/home")}
          >
            Home
          </button>
          <button
            className="btn btn-outline rounded-none btn-info"
            onClick={() => navigate(`/createitem/${storeId}`)}
          >
            New
          </button>
        </div>
      </div>
    </>
  );
};
