import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom"
import { DataContext } from "../contexts/dataContext";
import { ProductReducerContext } from "../contexts/productReducerContext/productReducerContext";

export const ProductPage = () => {
    const {productID} = useParams();
    const {responseData} = useContext(DataContext);
    const product = responseData?.productData?.products?.find(({_id}) => _id === productID );
    const {setIsSearchModalOpen} = useContext(ProductReducerContext);

    useEffect(() => {
        setIsSearchModalOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <h2>{product?.title}</h2>
    )
}