import { useState } from "react";
import { useAuthProvider } from "../providers/AuthContext";
import { useNavigate } from "react-router-dom";
import profileImage from "../assets/guyprofile.jpg";
import { useAppProvider } from "../providers/AppContext";
import { ThemeToggler } from "../theme/ThemeToggler";

export const SignIn = () => {
  const { handleLogin } = useAuthProvider();
  const { userTheme } = useAppProvider();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleAuthRoute = async () => {
    await handleLogin({
      email: user.email,
      password: user.password,
    });

    navigate("/home");
  };

  const goToSignUp = () => {
    navigate("/signup");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("submitted");
    handleAuthRoute();
  };

  const fields = [{ name: "email" }, { name: "password" }];
  return (
    <>
      <div data-theme={userTheme} className='hero min-h-screen '>
        <div className='hero-content flex-col lg:flex-row-reverse'>
          <div className='text-center lg:text-left'>
            <h1 className='text-5xl font-bold'>Login now!</h1>
            <p className='py-6'>
              Welcome Back to READY-SET-GO! Please login to your account.
            </p>
          </div>
          <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
            <form className='card-body' onSubmit={handleSubmit}>
              <div className='form-control'>
                <div className='avatar justify-center'>
                  <div className='w-36 mask mask-squircle'>
                    <img src={profileImage} />
                  </div>
                </div>
                {fields.map((field) => (
                  <>
                    <label className='label'>
                      <span className='label-text'>{field.name}</span>
                    </label>
                    <input
                      type={field.name}
                      placeholder={field.name}
                      className='input input-bordered'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUser({ ...user, [field.name]: e.target.value })
                      }
                      required
                    />
                  </>
                ))}
              </div>

              <div className='form-control mt-6 flex gap-1'>
                <button type='submit' className='btn btn-info'>
                  Login
                </button>
                <button
                  type='button'
                  className='btn btn-primary'
                  onClick={() => goToSignUp()}
                >
                  Sign Up
                </button>
              </div>
              <ThemeToggler />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
