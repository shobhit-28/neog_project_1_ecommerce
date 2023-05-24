import { useContext, useEffect, useState } from 'react'
import './cartPage.css'
import { CartContext } from '../../contexts/cartContext';
import { PriceCard } from '../../components/priceCard/priceCard';
import { Loader } from '../../components/loader/loader';

export const CartPage = () => {
    const encodedToken = localStorage?.getItem('encodedToken');

    const { removeFromCart, incDecCart } = useContext(CartContext);

    const [cartData, setCartData] = useState(undefined);

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

    const increaseItems = (productId) => {
        setCartData(cartData.map((item) => item?._id === productId ? {...item, qty : item?.qty + 1} : item ))
        incDecCart(productId , 'increment')
    }

    const decreaseItems = (productId) => {
        setCartData(cartData.map((item) => item?._id === productId ? {...item, qty : item?.qty - 1} : item ))
        incDecCart(productId , 'decrement')
    }

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="cart-page">
            {!cartData
                ?
                <Loader />
                :
                <>
                    <p className="heading">Cart</p>
                    {cartData?.length > 0
                        ?
                        <div className="cart-parent">
                            <div className="cart-products">
                                {cartData?.map((product) => (
                                    <div className="cart-product" key={product?._id}>
                                        <p className="product-name">{product?.title} ({product?.qty})</p>
                                        <button className="increase" onClick={() => increaseItems(product?._id)}>+</button>
                                        <button className="decrease" onClick={() => product?.qty >1 ? decreaseItems(product?._id) : removeFromCartClickHandler(product?._id) }>-</button>
                                        <button className="remove-from-cart" onClick={() => removeFromCartClickHandler(product?._id)}>Remove from cart</button>
                                    </div>
                                ))}
                            </div>
                            <PriceCard cartData={cartData} />
                        </div>
                        :
                        <div className="empty-cart">
                            <h1 className="empty-cart">Empty Cart</h1>
                        </div>
                    }
                </>}
        </div>
    )
}
