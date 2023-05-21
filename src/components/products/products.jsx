import './products.css'

export const Products = ({product}) => {
    return (
        <div className="product-by-category">
            <p className="product-title">
                {product?.title}
            </p>
        </div>
    )
}
