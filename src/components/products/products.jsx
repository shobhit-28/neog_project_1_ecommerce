import { useContext } from 'react'
import './products.css'
import { WishListContext } from '../../contexts/wishListContext'
import { AuthContext } from '../../contexts/authContext'
import { CartContext } from '../../contexts/cartContext'
import { useNavigate } from 'react-router'

export const Products = ({ product }) => {
    const { addToWishList, removeFromWishlist } = useContext(WishListContext)
    const { wishlistedIds, cartItemsIds } = useContext(AuthContext)
    const { addToCart } = useContext(CartContext)

    const navigate = useNavigate()

    return (
        <div className="product-by-category">
            <p className="product-title">
                {product?.title}
            </p>
            {wishlistedIds?.includes(product?._id)
                ?
                < button className="go-to-wishlist" onClick={() => removeFromWishlist(product?._id)}>Remove from wishlist</button>
                :
                < button className="add-to-wishlist" onClick={() => addToWishList(product)}>Add to wishlist</button>
            }
            {cartItemsIds?.includes(product?._id)
                ?
                < button className="go-to-wishlist" onClick={() => navigate('/cart')}>Go to cart</button>
                :
                < button className="add-to-wishlist" onClick={() => addToCart(product)}>Add to cart</button>
            }
        </div >
    )
}
