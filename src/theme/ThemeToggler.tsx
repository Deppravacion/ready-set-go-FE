import { useAppProvider } from "../providers/AppContext";

export const ThemeToggler = () => {
  const { userTheme, setUserTheme } = useAppProvider();
  const themeToggler = () => {
    userTheme === "business"
      ? setUserTheme("winter")
      : setUserTheme("business");
    console.log(userTheme);
  };
  return (
    <>
      <input
        type='checkbox'
        className='toggle toggle-info toggle-xs'
        checked={userTheme === "winter"}
        onChange={themeToggler}
      />
    </>
  );
};
