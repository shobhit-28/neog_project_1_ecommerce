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

            const data = await response.json();
            localStorage.setItem('encodedToken', data?.encodedToken);
            localStorage.setItem('userName', `${data?.foundUser?.firstName} ${data?.foundUser?.lastName}`)
            localStorage.setItem('userEmail', data?.foundUser?.email)
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

            const data = await response.json();
            if (data?.encodedToken) {
                localStorage.setItem('encodedToken', data?.encodedToken);
                localStorage.setItem('userName', `${data?.foundUser?.firstName} ${data?.foundUser?.lastName}`)
                localStorage.setItem('userEmail', data?.foundUser?.email)
                setIsLoggedIn(true)
            } else {
                console.log(data?.errors);
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
                localStorage.setItem('encodedToken', data?.encodedToken);
                localStorage.setItem('userName', `${data?.foundUser?.firstName} ${data?.foundUser?.lastName}`)
                localStorage.setItem('userEmail', data?.foundUser?.email)
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
            login,
        }}>
            {children}
        </AuthContext.Provider>
    )

}