import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataHandler = ({ children }) => {
    const [responseData, setResponseData] = useState({ productData: [], productCategories: [] });
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const fetchProductsData = async () => {
        try {
            const data = await fetch('/api/products')
            const category = await fetch('/api/categories')
            setResponseData({ ...responseData, productData: await data.json(), productCategories: await category.json() })
        } catch (error) {
            console.error(error);
        }
    }

    const testLogin = async () => {
        try {
            const testCreds = {
                email: "shobhitraj34.com",
                password: "shobhit28",
            }

            const loginData = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(testCreds)
            });

            const userData = await loginData.json();
            localStorage.setItem('encodedToken', userData?.encodedToken);
            setIsLoggedIn(true)

        } catch (error) {
            console.error(error);
        }
    }

    const logOut = () => {
        localStorage.removeItem("encodedToken");
        setIsLoggedIn(false)
    }

    useEffect(() => {
        fetchProductsData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <DataContext.Provider value={{
            responseData,
            testLogin,
            isLoggedIn,
            logOut
        }}>
            {children}
        </DataContext.Provider>
    )

}