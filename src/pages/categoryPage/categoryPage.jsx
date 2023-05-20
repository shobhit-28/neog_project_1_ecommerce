import { useParams } from 'react-router';
import './categoryPage.css'
import { useContext, useEffect } from 'react';
import { ProductReducerContext } from '../../contexts/productReducerContext/productReducerContext';
import { DataContext } from '../../contexts/dataContext';

export const CategoryPage = () => {
    const {categoryName} = useParams();
    const {setIsSearchModalOpen} = useContext(ProductReducerContext);
    const {responseData} = useContext(DataContext);
    const category = responseData?.productCategories?.categories?.find((category) => category?.categoryName === categoryName );
    
    useEffect(() => {
        setIsSearchModalOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  return (
    <div className="category-page">
        <div className="category-front" style={{backgroundImage: `url(${category?.image})`}}>
            <p className="category-title">
                {category?.categoryName}
            </p>
        </div>
        {responseData?.productData?.products?.filter(({category}) => category === categoryName ).map((product) => (
            <div className="product-by-category" key={product?.id}>
                <p className="product-title">
                    {product?.title}
                </p>
            </div>
        ))}
    </div>
  )
}