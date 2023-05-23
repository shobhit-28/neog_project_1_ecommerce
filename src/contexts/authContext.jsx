import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthenticationHandler = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage?.getItem('encodedToken')?.length > 0)
    const [wishlistedIds, setWishlistedIds] = useState([])
    const [cartItemsIds, setCartItemsIds] = useState([])

    const testLogin = async () => {
        try {
            const testCreds = {
                email: "shobhitraj34@gmail.com",
                password: "shohehe",
            }

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(testCreds)
            });

            const data = await response.json();
            localStorage.setItem('encodedToken', data?.encodedToken);
            localStorage.setItem('userName', `${data?.foundUser?.firstName} ${data?.foundUser?.lastName}`)
            localStorage.setItem('userEmail', data?.foundUser?.email)
            setIsLoggedIn(true)
            data?.foundUser?.wishlist?.length > 0 ? setWishlistedIds(data?.foundUser?.wishlist?.map(({ _id }) => _id)) : setWishlistedIds([])
            data?.foundUser?.cart?.length > 0 ? setCartItemsIds(data?.foundUser?.cart?.map(({ _id }) => _id)) : setCartItemsIds([])
        } catch (error) {
            console.error(error);
        }
    }

    const login = async (loginInputData) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(loginInputData)
            });

            const data = await response.json();
            if (data?.encodedToken) {
                localStorage.setItem('encodedToken', data?.encodedToken);
                localStorage.setItem('userName', data?.foundUser?.name)
                localStorage.setItem('userEmail', data?.foundUser?.email)
                setIsLoggedIn(true)
                data?.foundUser?.wishlist?.length > 0 ? setWishlistedIds(data?.foundUser?.wishlist?.map(({ _id }) => _id)) : setWishlistedIds([])
                data?.foundUser?.cart?.length > 0 ? setCartItemsIds(data?.foundUser?.cart?.map(({ _id }) => _id)) : setCartItemsIds([])
            } else {
                alert(`Error ${response?.status}: ${data?.errors[0]}`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const logOut = () => {
        localStorage.clear();
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
                if (data?.encodedToken) {
                    localStorage.setItem('encodedToken', data?.encodedToken);
                    localStorage.setItem('userName', data?.createdUser?.name)
                    localStorage.setItem('userEmail', data?.createdUser?.email)
                    setIsLoggedIn(true)
                    setWishlistedIds([])
                    setCartItemsIds([])
                } else {
                    alert(`Error ${response?.status}: ${data?.errors[0]}`);
                }

            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            testLogin,
            isLoggedIn,
            logOut,
            signUp,
            login,
            wishlistedIds,
            setWishlistedIds,
            cartItemsIds,
            setCartItemsIds
        }}>
            {children}
        </AuthContext.Provider>
    )

}