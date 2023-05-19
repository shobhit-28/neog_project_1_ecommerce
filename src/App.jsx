
import { Route, Routes } from "react-router-dom";
import Mockman from "mockman-js";

import { HomePage } from "./pages/HomePage/HomePage";
import { Header } from "./components/header/header";
import { ProductPage } from "./pages/ProductPage";
import { Footer } from "./components/footer/footer";
import { SearchPage } from "./pages/searchPage/searchPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mockman" element= {<Mockman />} />
        <Route path="/product/:productID" element={<ProductPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
