import './priceCard.css'

import { useNavigate } from 'react-router'

export const PriceCard = ({ cartData }) => {
    const navigate = useNavigate()

    return (
        <div className="price-details">
            <p className="heading">Cart Price Details</p>
            {cartData?.map((cartItem) => (
                <div className="product-price-name" key={cartItem?._id}>
                    <p className="item-title">{`${cartItem?.title?.slice(0, 12)}...`} ({cartItem?.qty})</p>
                    <p className="item-price">{`₹ ${Math.round(((cartItem?.price * cartItem?.qty) + Number.EPSILON) * 100) / 100}`}</p>
                </div>
            ))}
            <div className="total-price">
                <p className="price-heading">Total Price:</p>
                <p className="total-price">{`₹ ${Math.round(((cartData.reduce((acc, curr) => acc + (curr?.price * curr?.qty), 0)) + Number.EPSILON) * 100) / 100}`}</p>
            </div>
            <button className="checkout" onClick={() => navigate('/checkout')} >Checkout</button>
        </div>
    )
}