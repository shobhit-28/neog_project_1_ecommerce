import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartHandler = ({children}) => {
    const encodedToken = localStorage?.getItem('encodedToken');

    const [cartItemsIds, setCartItemsIds] = useState([])

    const addToCart = async (product) => {
        try {
            if (cartItemsIds.includes(product?.id)) {
                alert('already exists')
            } else {
                await fetch('/api/user/wishlist', {
                    method: 'POST',
                    headers: { authorization: encodedToken },
                    body: JSON.stringify({ product })
                });
                // setWishListData((await response.json())?.wishlist)
                setCartItemsIds([...cartItemsIds, product?.id])
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <CartContext.Provider value={{
            addToCart
        }}>
            {children}
        </CartContext.Provider>
    )

}