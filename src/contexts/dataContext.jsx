import { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataHandler = ({ children }) => {
    const [responseData, setResponseData] = useState({ productData: [], productCategories: [] });
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage?.getItem('encodedToken')?.length > 0)

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

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(testCreds)
            });

            const userData = await response.json();
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

    const signUp = async (signupInputData, isValid) => {
        if (isValid?.isEmail && isValid?.isPassword && isValid?.isPassAndConfirmPassEqual && isValid?.isName) {
            try {
                const response = await fetch('/api/auth/signup', {
                    method: 'POST',
                    body: JSON.stringify(signupInputData)
                });

                const data = await response.json();
                localStorage.setItem('encodedToken', data?.encodedToken);
                setIsLoggedIn(true)
            } catch (error) {
                console.error(error);
            }
        }
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
            logOut,
            signUp
        }}>
            {children}
        </DataContext.Provider>
    )

}