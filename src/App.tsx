import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Home } from "./pages/Home";
import { PrivateRoutes } from "./utils/PrivateRoutes";
import { CreateStore } from "./pages/CreateStore";
import { Details } from "./pages/Details";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { HowItWorks } from "./pages/HowItWorks";
import { AuthProvider } from "./providers/AuthContext";
import { AppProvider } from "./providers/AppContext";
import { CreateItem } from "./pages/CreateItem";

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path='/createstore' element={<CreateStore />} />
              <Route path='/createitem/:storeId' element={<CreateItem />} />
              <Route path='/details/:storeId' element={<Details />} />
              <Route path='/home' element={<Home />} />
            </Route>
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/howitworks' element={<HowItWorks />} />
            <Route index path='/' element={<Navigate to={"/signin"} />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
