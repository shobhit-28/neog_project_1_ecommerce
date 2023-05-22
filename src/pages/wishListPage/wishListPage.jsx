import { useContext } from 'react'
import './wishListPage.css'
import { WishListContext } from '../../contexts/wishListContext'

export const WishListPage = () => {
    const { wishListData, removeFromWishlist } = useContext(WishListContext);

    console.log(wishListData)

    return (
        <div className="wishlist-page">
            <p className="heading">Wishlist</p>
            <div className="wishlist-products">
                {wishListData?.map((product) => (
                    <div className="wishlist-product">
                        <p className="product-name">{product?.title}</p>
                        <button className="remove-from-wishlist" onClick={() => removeFromWishlist(product?.id)}>Remove from wishlist</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
