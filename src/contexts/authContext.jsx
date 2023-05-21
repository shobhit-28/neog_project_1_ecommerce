import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthenticationHandler = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage?.getItem('encodedToken')?.length > 0)

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

    const login = async (loginInputData) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(loginInputData)
            });

            const userData = await response.json();
            if (userData?.encodedToken) {
                localStorage.setItem('encodedToken', userData?.encodedToken);
                setIsLoggedIn(true)
            } else {
                console.log(userData?.errors);
            }
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

    return (
        <AuthContext.Provider value={{
            testLogin,
            isLoggedIn,
            logOut,
            signUp,
            login
        }}>
            {children}
        </AuthContext.Provider>
    )

}