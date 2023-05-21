import { useContext, useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/authContext';

export const Login = () => {
    const { testLogin, logOut, isLoggedIn } = useContext(AuthContext);

    const navigate = useNavigate()

    const [loginInputData, setLoginInputData] = useState({ email: '', password: '' })

    const emailChangeHandler = (event) => {
        setLoginInputData({...loginInputData, email: event.target.value})
    }

    const passwordChangeHandler = (event) => {
        setLoginInputData({...loginInputData, password: event.target.value})
    }

    return (
        <div className="login-page">
            <div className="login-modal">
                <form action="" className="login">
                    <label className="email">
                        <span className="input-title">Email: </span>
                        <input type="email" name="" id="email" onChange={emailChangeHandler} />
                    </label>
                    <label className="password">
                        <span className="input-title">Password: </span>
                        <input type="password" name="" id="password" onChange={passwordChangeHandler} />
                    </label>
                </form>
                {isLoggedIn
                    ?
                    <>
                        <button className="logout" onClick={logOut}>Logout</button>
                    </>
                    :
                    <>
                        <button className="login">Login</button>
                        <button className="test-login" onClick={testLogin}>Test Login</button>
                        <button className="signup" onClick={() => navigate('/sign-up')}>Sign Up</button>
                    </>}
            </div>
        </div>
    )
}
