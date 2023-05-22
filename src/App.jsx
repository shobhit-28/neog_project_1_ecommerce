import { useContext } from "react";
import { AuthContext } from "./contexts/authContext";

import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Mockman from "mockman-js";

import { HomePage } from "./pages/HomePage/HomePage";
import { Header } from "./components/header/header";
import { ProductPage } from "./pages/ProductPage";
import { Footer } from "./components/footer/footer";
import { SearchPage } from "./pages/searchPage/searchPage";
import { CategoryPage } from "./pages/categoryPage/categoryPage";
import { Login } from "./pages/login/login";
import { SignupPage } from "./pages/signup/signupPage";
import { ProfilePage } from "./pages/profilePage/profilePage";
import { RequiresAuth } from "./requiresAuth/requiresAuth";
import { WishListPage } from "./pages/wishListPage/wishListPage";
import { CartPage } from "./pages/cartPage/cartPage";

function App() {

  const { isLoggedIn } = useContext(AuthContext);

  const location = useLocation();

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mockman" element={<Mockman />} />
        <Route path="/product/:productID" element={<ProductPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/login" element={isLoggedIn
          ? (location?.state !== null)
            ? <Navigate to={location?.state?.from?.pathname} />
            : <Navigate to="/" />
          : <Login />} />
        <Route path="/sign-up" element={isLoggedIn ? <Navigate to="/" /> : <SignupPage />} />
        <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <Navigate to='/login' />} />
        <Route path="/wishlist" element={<RequiresAuth><WishListPage /></RequiresAuth>} />
        <Route path="/cart" element={<RequiresAuth><CartPage /></RequiresAuth>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
