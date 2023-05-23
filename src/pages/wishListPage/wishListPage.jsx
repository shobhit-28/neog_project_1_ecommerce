import { useContext, useEffect, useState } from 'react'
import './wishListPage.css'
import { WishListContext } from '../../contexts/wishListContext'

export const WishListPage = () => {
    const encodedToken = localStorage?.getItem('encodedToken');
    
    const { removeFromWishlist } = useContext(WishListContext);

    const [wishlistData, setWishlistData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/user/wishlist', {
                method: 'GET',
                headers: { authorization: encodedToken }
            });
            setWishlistData((await response.json())?.wishlist)
        } catch (error) {
            console.error(error);
        }
    }

    const removeFromWishlistClickHandler = (productID) => {
        setWishlistData(wishlistData?.filter(({_id}) => productID !== _id ))
        removeFromWishlist(productID)
    }

    useEffect(() => {
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="wishlist-page">
            <p className="heading">Wishlist</p>
            <div className="wishlist-products">
                {wishlistData?.map((product) => (
                    <div className="wishlist-product" key={product?._id} >
                        <p className="product-name">{product?.title}</p>
                        <button className="remove-from-wishlist" onClick={() => removeFromWishlistClickHandler(product?._id)}>Remove from wishlist</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
