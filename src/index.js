import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { DataHandler } from "./contexts/dataContext";
import { ProductReducerHandler } from "./contexts/productReducerContext/productReducerContext";
import { AuthenticationHandler } from "./contexts/authContext";
import { WishListHandler } from "./contexts/wishListContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DataHandler>
        <ProductReducerHandler>
          <AuthenticationHandler>
            <WishListHandler>
              <App />
            </WishListHandler>
          </AuthenticationHandler>
        </ProductReducerHandler>
      </DataHandler>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
