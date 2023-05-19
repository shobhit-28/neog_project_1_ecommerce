import { createContext, useContext, useReducer, useState } from "react";
import { DataContext } from "../dataContext";
import { ProductReducer } from "./productReducer";
import { types } from './types'


export const ProductReducerContext = createContext();


export const ProductReducerHandler = ({ children }) => {
    const { responseData } = useContext(DataContext);
    
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [searchBarData, setSearchBarData] = useState('')
    
    const initialState = {
        searchData: []
    };

    const {
        SEARCH
    } = types

    const [state, dispatch] = useReducer(ProductReducer, initialState);

    const searchHandler = (event) => {
        setIsSearchModalOpen(true)
        setSearchBarData(event.target.value)
        dispatch({
            type: SEARCH,
            payload: { input: event.target.value, data: responseData?.productData?.products}
        })
    }

    return (
        <ProductReducerContext.Provider value={{
            searchHandler, 
            searchData: state.searchData,
            isSearchModalOpen,
            setIsSearchModalOpen,
            searchBarData
        }}>
            {children}
        </ProductReducerContext.Provider>
    )
}