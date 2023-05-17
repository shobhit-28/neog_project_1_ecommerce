import { createContext, useContext, useReducer } from "react";
import { DataContext } from "../dataContext";
import { ProductReducer } from "./productReducer";
import {types} from './types'


export const ProductReducerContext = createContext();


export const ProductReducerHandler = ({children}) => {
    const {responseData} = useContext(DataContext);

    const initialState = {
        searchData: [],
    };

    const {
        SEARCH
    } = types

    const [state, dispatch] = useReducer(ProductReducer, initialState);

    const searchHandler = (event) => {
        dispatch({
            type: SEARCH,
            payload: {input: event.target.value, data: responseData?.productData?.products}
        })
    }

    return(
        <ProductReducerContext.Provider value={{searchHandler, state}}>
            {children}
        </ProductReducerContext.Provider>
    )
}