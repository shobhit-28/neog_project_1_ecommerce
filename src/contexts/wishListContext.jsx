import { createContext, useContext } from "react";
import { AuthContext } from "./authContext";

export const WishListContext = createContext();

export const WishListHandler = ({ children }) => {
    const encodedToken = localStorage?.getItem('encodedToken');

    const {wishlistedIds, setWishlistedIds} = useContext(AuthContext)

    const addToWishList = async (product) => {
        try {
            if (wishlistedIds.includes(product?.id)) {
                alert('already exists')
            } else {
                await fetch('/api/user/wishlist', {
                    method: 'POST',
                    headers: { authorization: encodedToken },
                    body: JSON.stringify({ product })
                });
                setWishlistedIds([...wishlistedIds, product?.id])
            }
        } catch (error) {
            console.error(error);
        }
    }

    const removeFromWishlist = async (productId) => {
        try {
            await fetch(`/api/user/wishlist/${productId}`, {
                method: 'DELETE',
                headers: { authorization: encodedToken }
            });
            setWishlistedIds(wishlistedIds?.filter((id) => id !== productId ))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <WishListContext.Provider value={{
            addToWishList,
            removeFromWishlist,
            setWishlistedIds
        }}>
            {children}
        </WishListContext.Provider>
    )
}