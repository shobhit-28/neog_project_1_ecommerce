import { useParams } from 'react-router';
import './categoryPage.css'
import { useContext, useEffect, useState } from 'react';
import { ProductReducerContext } from '../../contexts/productReducerContext/productReducerContext';
import { DataContext } from '../../contexts/dataContext';
import { Filters } from '../../components/filters/filters';

export const CategoryPage = () => {
    const { categoryName } = useParams();
    const { setIsSearchModalOpen } = useContext(ProductReducerContext);
    const { responseData } = useContext(DataContext);
    const category = responseData?.productCategories?.categories?.find((category) => category?.categoryName === categoryName);
    const products = responseData?.productData?.products?.filter(({ category }) => category === categoryName)

    const [priceFilteredData, setPriceFilteredData] = useState(products);
    // const [checkedArr, setCheckedArr] = useState([])

    useEffect(() => {
        setIsSearchModalOpen(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="category-page">
            <div className="category-front" style={{ backgroundImage: `url(${category?.image})` }}>
                <p className="category-title">
                    {category?.categoryName}
                </p>
            </div>
            <div className="contents">
                <div className="category-filters">
                    <Filters productData={products} setFilteredData={setPriceFilteredData} />
                </div>
                <div className='products'>
                    {priceFilteredData ?

                        priceFilteredData.length === 0 ?

                        <div className="not-available">
                            <p>Sorry, but there are no products available in the selected price range.</p>
                        </div>

                        :priceFilteredData?.map((product) => (
                            <div className="product-by-category" key={product?.id}>
                                <p className="product-title">
                                    {product?.title}
                                </p>
                            </div>
                        ))
                        :
                        products?.map((product) => (
                            <div className="product-by-category" key={product?.id}>
                                <p className="product-title">
                                    {product?.title}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}