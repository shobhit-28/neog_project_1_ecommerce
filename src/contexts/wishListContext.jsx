import { createContext, useEffect, useState } from "react";

export const WishListContext = createContext();

export const WishListHandler = ({children}) => {
    const encodedToken = localStorage?.getItem('encodedToken');

    const [wishListData, setWishListData] = useState([])

    const fetchWishListData = async () => {
        try {
            const response = await fetch('/api/user/wishlist', {
                headers: {authorization: encodedToken}
            });
            setWishListData((await response.json())?.wishlist)
        } catch (error) {
            console.error(error);
        }
    }

    const addToWishList = async (product) => {
        try {
            const response = await fetch('/api/user/wishlist', {
                method: 'POST',
                headers: {authorization: encodedToken},
                body: JSON.stringify({product})
            });
            setWishListData((await response.json())?.wishlist)
        } catch (error) {
            console.error(error);
        }
    }

    const removeFromWishlist = async (productId) => {
        try {
            const response = await fetch(`/api/user/wishlist/:${productId}`, {
                method: 'DELETE',
                headers: {authorization: encodedToken}
            });
            console.log((await response.json())?.wishlist)
            console.log(productId)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchWishListData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <WishListContext.Provider value={{
            wishListData,
            addToWishList,
            removeFromWishlist
        }}>
            {children}
        </WishListContext.Provider>
    )
}