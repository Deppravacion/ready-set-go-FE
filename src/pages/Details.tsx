import { useNavigate, useParams } from "react-router-dom";
import { useAuthProvider } from "../providers/AuthContext";
import { useAppProvider } from "../providers/AppContext";
import { FavoritesType, ItemsType } from "../types/AppTypes";
import { useEffect, useState } from "react";
import {
  getItemsByStoreId,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../api/items/api-items";
import {
  getFavoritesFromDB,
  toggleFavorite,
} from "../api/favorites/api-favorites";

const subTitle: string = "Store details!";

type CardProps = {
  item: ItemsType;
  fetchItems: () => void;
  favorites?: FavoritesType[];
};

const CollapseItem: React.FC<CardProps> = ({ item, fetchItems, favorites }) => {
  const { id, name, image, description, quantity, minQuantity } = item;
  const isFavorite = favorites && favorites.some((fav) => fav.itemId === id);

  return (
    <>
      <div
        className={`collapse collapse-arrow bg-base-200 ${
          isFavorite ? "ring-2 ring-red-500" : ""
        } `}
      >
        <input type='checkbox' className='peer' />
        <div className='collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content'>
          name: {name}
        </div>
        <div className='collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content'>
          <div className='avatar'>
            <div className='w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
              <img src={image} />
            </div>
            {/* <div>image link:{image}</div> */}
          </div>
          <p>{description}</p>
          {/* <p>id: {id}</p> */}
          <p>quantity: {quantity}</p>
          <p>minimum quantity: {minQuantity} </p>
          <ItemsInterface
            item={item}
            fetchItems={fetchItems}
            favorites={favorites}
          />
        </div>
      </div>
    </>
  );
};

const ItemsInterface: React.FC<CardProps> = ({ item, fetchItems }) => {
  const { handleDeleteItem } = useAppProvider();
  const deleteItem = () => {
    if (!item) return;
    if (!item.id) return;
    handleDeleteItem(item.id);
    fetchItems();
  };

  return (
    <>
      {item && item.id && (
        <>
          <div className='flex  gap-1 flex-col justify-center text-2xl mb-1 p-4'>
            <button
              className='btn btn-info flex btn-sm min-w-16 text-2xl items-center leading-none'
              onMouseDown={() => increaseItemQuantity(item!.id!)}
            >
              +
            </button>
            <button
              className='btn  btn-warning btn-sm min-w-16 text-2xl items-center leading-none'
              onMouseDown={() => decreaseItemQuantity(item!.id!)}
            >
              -
            </button>
          </div>
          <div className='flex justify-around'>
            <button
              className='btn btn-error btn-sm min-w-16'
              onMouseDown={() => deleteItem()}
            >
              Delete
            </button>
            <button
              className='btn btn-success btn-sm min-w-16'
              onMouseDown={() => toggleFavorite(item!.id!)}
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
  const { handleLogout } = useAuthProvider();
  const { stores, userTheme } = useAppProvider();
  const { storeId } = useParams();
  const [storeItems, setStoreItems] = useState<ItemsType[]>();
  const [favoriteItems, setFavoriteItems] = useState<FavoritesType[]>();
  const storeName = stores?.find((store) => store.id === storeId)?.name;

  const fetchItems = async () => {
    const items = await getItemsByStoreId(storeId ?? "");
    if (items) setStoreItems(items);
  };
  const fetchFavorites = async () => {
    const favorites = await getFavoritesFromDB();
    if (favorites) setFavoriteItems(favorites);
  };

  useEffect(() => {
    fetchItems();
    fetchFavorites();
  }, [stores, storeItems]);

  return (
    <>
      <div
        data-theme={userTheme}
        className='card w-96 bg-base-100 shadow-xl m-auto p-4'
      >
        <div className='container mx-auto p-10 bg-accent rounded-md '>
          <h2 className='text-lg'>{storeName}</h2>
          <h2 className='text-md'>{`${subTitle} for the store: ${storeId}`}</h2>
        </div>
        <div className='card-body'>
          {/* ******** */}
          {storeItems &&
            storeItems.map((item, i) => {
              return (
                <CollapseItem
                  key={i}
                  item={item}
                  fetchItems={fetchItems}
                  favorites={favoriteItems}
                />
              );
            })}
          {/* ******** */}
        </div>

        <div className='flex justify-between my-[10px]'>
          <button
            className='btn btn-outline rounded-none btn-warning px-2'
            onClick={() => {
              handleLogout();
              navigate("/signin");
            }}
          >
            Logout
          </button>
          <button
            className='btn btn-outline rounded-none btn-success'
            onClick={() => navigate("/home")}
          >
            Home
          </button>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className='btn btn-outline rounded-none btn-info'
            onClick={() => navigate(`/createitem/${storeId}`)}
          >
            New
          </button>
        </div>
      </div>
    </>
  );
};
