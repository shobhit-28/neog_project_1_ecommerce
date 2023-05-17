import "./App.css";

import { Route, Routes } from "react-router-dom";
import Mockman from "mockman-js";

import { HomePage } from "./pages/HomePage";
import { Header } from "./components/header/header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mockman" element= {<Mockman />} />
      </Routes>
    </div>
  );
}

export default App;
