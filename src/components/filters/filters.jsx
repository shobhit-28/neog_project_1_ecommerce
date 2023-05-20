import './filters.css'

export const Filters = ({ productData }) => {
    const checkBoxArr = [...new Set(productData?.map(({ brand }) => brand))]
    const maxPrice = productData?.reduce((acc, curr) => acc > curr?.price ? acc : curr?.price ,0);
    return (
        <div className="filters">
            <p className="filters-head">Filters</p>
            {maxPrice && <label className='price-slider'>
                <p>Price</p>
                <div className="prices">
                    <p>0</p>
                    <p>{Math.round(maxPrice/2)}</p>
                    <p>{Math.round(maxPrice)}</p>
                </div>
                <input type="range" className="price-slider" min='0' max={maxPrice + 1} defaultValue={maxPrice + 1} />
            </label>}
            <div className="brand-section">
                <p>Brands</p>
                {checkBoxArr?.map((brand, index) => (
                    <label className="brand-selector" key={index}>
                        <input type="checkbox" name={brand} /> {brand}
                    </label>
                ))}
            </div>
            <div className="sort-by-price">
                <p>Sort By Price</p>
                <label><input type="radio" name="price" id="" />Sort high To Low</label>
                <label><input type="radio" name="price" id="" />Sort Low to High</label>
            </div>
            <div className="sort-by-rating">
                <p>Sort By Price</p>
                <label><input type="radio" name="rating" id="" value={5}/>5 stars and below</label>
                <label><input type="radio" name="rating" id="" value={4}/>4 stars and below</label>
                <label><input type="radio" name="rating" id="" value={3}/>3 stars and below</label>
                <label><input type="radio" name="rating" id="" value={2}/>2 stars and below</label>
                <label><input type="radio" name="rating" id="" value={1}/>1 stars and below</label>
            </div>
        </div>
    )
}
