import { useState, FormEvent, ChangeEvent } from "react";
import { useAppProvider } from "../providers/AppContext";
import { useAuthProvider } from "../providers/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { ItemsType } from "../types/AppTypes";

const title: string = "Ready Set Go!";
const subTitle: string = " Create a New Item!";

const blankItem: ItemsType = {
  id: Math.random().toString(),
  name: "",
  image: "",
  description: "",
  quantity: "",
  minQuantity: "",
  storeId: "",
};

export const CreateItem = () => {
  const navigate = useNavigate();
  const { handleCreateItem, userTheme } = useAppProvider();
  const { handleLogout } = useAuthProvider();
  const [item, setItem] = useState<ItemsType>(blankItem);
  const { storeId } = useParams();

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    { item, storeId }: { item: ItemsType; storeId: string }
  ) => {
    e.preventDefault();
    await handleCreateItem(item, storeId).then(() => {
      setItem({ ...item });
    });
    navigate("/home");
  };

  const fields = [
    { name: "name" },
    { name: "image" },
    { name: "description" },
    { name: "quantity" },
    { name: "minQuantity" },
  ];

  return (
    <>
      <div
        data-theme={userTheme}
        className='card w-96 bg-base-100 shadow-xl m-auto p-4'
      >
        <div className='container mx-auto p-10 bg-cyan-600 rounded-md'>
          <h2 className='text-lg'>{title}</h2>
          <h2 className='text-md'>{subTitle}</h2>
        </div>
        <div className='card-body'>
          {/* ******** */}
          <form
            className='card-body'
            onSubmit={(e: FormEvent<HTMLFormElement>) =>
              handleSubmit(e, { item, storeId: storeId ?? "" })
            }
          >
            <div className='form-control'>
              {fields.map((field) => {
                return (
                  <label className='label ' key={field.name}>
                    <input
                      type='text'
                      placeholder={field.name}
                      className='input input-bordered max-w-full'
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setItem({ ...item, [field.name]: e.target.value })
                      }
                      required
                    />
                  </label>
                );
              })}
              <div className='form-control mt-6'>
                <button className='btn btn-primary'>Next</button>
              </div>
            </div>
          </form>
        </div>
        <div className='flex justify-around'>
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
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};
