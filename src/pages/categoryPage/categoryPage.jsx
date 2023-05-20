import { useParams } from 'react-router';
import './categoryPage.css'
import { useContext, useEffect } from 'react';
import { ProductReducerContext } from '../../contexts/productReducerContext/productReducerContext';
import { DataContext } from '../../contexts/dataContext';
import { Filters } from '../../components/filters/filters';

export const CategoryPage = () => {
    const { categoryName } = useParams();
    const { setIsSearchModalOpen } = useContext(ProductReducerContext);
    const { responseData } = useContext(DataContext);
    const category = responseData?.productCategories?.categories?.find((category) => category?.categoryName === categoryName);
    const products = responseData?.productData?.products?.filter(({ category }) => category === categoryName)

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
                    <Filters productData={products}/>
                </div>
                <div className='products'>
                    {products?.map((product) => (
                        <div className="product-by-category" key={product?.id}>
                            <p className="product-title">
                                {product?.title}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}