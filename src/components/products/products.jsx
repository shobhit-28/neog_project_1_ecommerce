import { useContext } from 'react'
import './products.css'
import { WishListContext } from '../../contexts/wishListContext'
import { AuthContext } from '../../contexts/authContext'

export const Products = ({ product }) => {
    const { addToWishList, removeFromWishlist } = useContext(WishListContext)
    const { wishlistedIds } = useContext(AuthContext)

    return (
        <div className="product-by-category">
            <p className="product-title">
                {product?.title}
            </p>
            {wishlistedIds?.includes(product?._id)
                ?
                < button className="go-to-wishlist" onClick={() => removeFromWishlist(product?._id)}>Remove from wishlist</button>
                :
                < button className="add-to-wishlist" onClick={() => addToWishList(product)}>Add to wishlist</button>}
        </div >
    )
}
