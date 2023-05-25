import { useContext, useEffect, useState } from 'react'
import './checkout.css'
import { Navigate, useNavigate } from 'react-router';
import { ProductReducerContext } from '../../contexts/productReducerContext/productReducerContext';
import { CartContext } from '../../contexts/cartContext';
import { Loader } from '../../components/loader/loader';
import { toast } from 'react-toastify';

export const CheckoutPage = () => {
    const encodedToken = localStorage?.getItem('encodedToken');

    const { addressData } = useContext(ProductReducerContext);
    const { clearCart } = useContext(CartContext);

    const [cartData, setCartData] = useState(undefined);
    const [selectedAddressId, setSelectedAddressId] = useState(addressData[0].id)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const selectedAddress = addressData?.find(({ id }) => id === Number(selectedAddressId))

    const navigate = useNavigate()

    let expectedDate = new Date();
    let dd = expectedDate.getDate() + Math.floor(Math.random() * 7) + 3;
    let mm = expectedDate.getMonth() + 1;
    let yy = expectedDate.getFullYear();
    if (dd <= 9) {
        dd = '0' + dd;
    }
    if (mm <= 9) {
        mm = '0' + mm;
    }
    if (dd >= 28) {
        dd = (dd - 28) + 1
    }
    expectedDate = dd + '-' + mm + '-' + yy;

    const orderHandler = () => {
        if (addressData?.length > 0) {
            setIsModalOpen(true)
            clearCart()
            setTimeout(() => {
                setCartData([])
                navigate("/");
            }, 4000);
        } else {
            toast.warn('It is essential to provide a valid shipping address', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    }

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

    const totalPrice = Math.round(((cartData?.reduce((acc, curr) => acc + (curr?.price * curr?.qty), 0) - cartData?.reduce((acc, curr) => acc + ((curr?.price * (curr.discountPercentage / 100)) * curr?.qty), 0)) + Number.EPSILON) * 100) / 100


    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="checkout-page">
            {isModalOpen ?
                <div className="modal-container">
                    <div className="checkout-modal">
                        <p className="heading">Order Confirmed</p>
                        <div className="details">
                            <p className="total-price">Total Price: ₹ {totalPrice}</p>
                            <p className="eta">Expected Delivery: {expectedDate}</p>
                            <p className="declaration">Order will be delivered to: </p>
                            <p className="recipient-name">{selectedAddress?.name}</p>
                            <p className="recipient-address">{selectedAddress?.address}</p>
                            <p className="recipient-number">Phone Number: {selectedAddress?.phone}</p>
                        </div>
                    </div>
                </div>
                :
                !cartData
                    ?
                    <Loader />
                    :
                    <>
                        {cartData?.length > 0
                            ?
                            <>
                                <h1 className="checkout-heading">Checkout</h1>
                                <div className="checkout-parent">

                                    <div className="address-div">
                                        {addressData?.map((address) => (
                                            <div className="radio-container">
                                                <label className="address-label" key={address?.id} >
                                                    <section className="radio">
                                                        <input type="radio" name="address" id="" value={address?.id} onClick={(event) => setSelectedAddressId(event?.target?.value)} />
                                                        <p className="name">{address?.name}</p>
                                                    </section>
                                                    <p className="address">{address?.pin}, {address?.address}</p>
                                                    <p className="city">{address?.city}</p>
                                                    <p className="state">{address?.state}</p>
                                                </label>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="checkout-card">
                                        <p className="heading">Order Details</p>
                                        {cartData?.map((cartItem) => (
                                            <div className="product-price-name" key={cartItem?._id}>
                                                <p className="item-title">{`${cartItem?.title}`}</p>
                                                <p className="item-price">{`(${cartItem?.qty})`}</p>
                                            </div>
                                        ))}
                                        <p className="heading">Price Details</p>
                                        <div className="price-details">
                                            <div className="price">
                                                <p className="price-heading">Price ({cartData?.length} items) </p>
                                                <p className="price">{`₹ ${Math.round(((cartData?.reduce((acc, curr) => acc + (curr?.price * curr?.qty), 0)) + Number.EPSILON) * 100) / 100}`}</p>
                                            </div>
                                            <div className="discount">
                                                <p className="discount-heading">Discount</p>
                                                <p className="discount">{`-₹ ${Math.round(((cartData?.reduce((acc, curr) => acc + ((curr?.price * (curr.discountPercentage / 100)) * curr?.qty), 0)) + Number.EPSILON) * 100) / 100}`}</p>
                                            </div>
                                            <div className="delivery">
                                                <p className="delivery-heading">Delivery</p>
                                                <p className="delivery-charge">₹ 250</p>
                                            </div>
                                            <div className="total-price">
                                                <p className="total-price-heading">Total Price</p>
                                                <p className="total-price">{`₹ ${totalPrice + 250}`}</p>
                                            </div>
                                        </div>
                                        <div className="address">
                                            <p className="heading">Deliver to</p>
                                            <p className="name">{selectedAddress?.name}</p>
                                            <p className="phone">{selectedAddress?.phone}</p>
                                        </div>
                                        <button className="place-order" onClick={() => orderHandler()}>Place Order</button>
                                    </div>

                                </div>
                            </>
                            :
                            <Navigate to='/' />
                        }
                    </>}
        </div>
    )
}
