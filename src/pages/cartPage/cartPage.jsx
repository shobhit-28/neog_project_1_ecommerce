import { useContext, useEffect, useState } from 'react'
import './cartPage.css'
import { CartContext } from '../../contexts/cartContext';

export const CartPage = () => {
    const encodedToken = localStorage?.getItem('encodedToken');

    const { removeFromCart } = useContext(CartContext);

    const [cartData, setCartData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/user/cart', {
                method: 'GET',
                headers: { authorization: encodedToken }
            });
            setCartData((await response.json())?.cart)
        } catch (error) {
            console.error(error);
        }
    }

    const removeFromCartClickHandler = (productID) => {
        setCartData(cartData?.filter(({ _id }) => productID !== _id))
        removeFromCart(productID)
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="cart-page">
            <p className="heading">Cart</p>
            <div className="cart-products">
                {cartData?.map((product) => (
                    <div className="cart-product">
                        <p className="product-name">{product?.title}</p>
                        <button className="remove-from-cart" onClick={() => removeFromCartClickHandler(product?._id)}>Remove from cart</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
