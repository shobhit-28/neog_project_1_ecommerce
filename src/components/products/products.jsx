import { useContext } from 'react'
import './products.css'
import { WishListContext } from '../../contexts/wishListContext'

export const Products = ({ product }) => {
    const { addToWishList } = useContext(WishListContext)

    return (
        <div className="product-by-category">
            <p className="product-title">
                {product?.title}
            </p>
            <button className="add-to-wishlist" onClick={() => addToWishList(product)}>Add to wishlist</button>
        </div>
    )
}
