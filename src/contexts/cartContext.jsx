import { createContext, useContext } from "react";
import { AuthContext } from "./authContext";

export const CartContext = createContext();

export const CartHandler = ({children}) => {
    const encodedToken = localStorage?.getItem('encodedToken');

    const {cartItemsIds, setCartItemsIds} = useContext(AuthContext)

    const addToCart = async (product) => {
        try {
            if (cartItemsIds.includes(product?.id)) {
                alert('already exists')
            } else {
                await fetch('/api/user/cart', {
                    method: 'POST',
                    headers: { authorization: encodedToken },
                    body: JSON.stringify({ product })
                });
                setCartItemsIds([...cartItemsIds, product?.id])
            }
        } catch (error) {
            console.error(error);
        }
    }

    const removeFromCart = async (productId) => {
        try {
            await fetch(`/api/user/cart/${productId}`, {
                method: 'DELETE',
                headers: { authorization: encodedToken }
            });
            setCartItemsIds(cartItemsIds?.filter((id) => id !== productId ))
        } catch (error) {
            console.error(error)
        }
    }

    const incDecCart = async (productId, type) => {
        try {
            await fetch(`/api/user/cart/${productId}`, {
                method: 'POST',
                headers: { authorization: encodedToken },
                body: JSON.stringify({action: { type }})
            })
        } catch (error) {
            console.error(error);
        }
    }

    const clearCart = async () => {
        try {
            for (const id of cartItemsIds) {
                await fetch(`/api/user/cart/${id}`, {
                    method: 'DELETE',
                    headers: { authorization: encodedToken }
                }); 
            }
            setCartItemsIds([])
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <CartContext.Provider value={{
            addToCart,
            removeFromCart,
            incDecCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )
}