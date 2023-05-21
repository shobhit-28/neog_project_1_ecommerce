import { useContext } from 'react'
import './login.css'
import { DataContext } from '../../contexts/dataContext'
import { useNavigate } from 'react-router';

export const Login = () => {
    const { testLogin, logOut, isLoggedIn } = useContext(DataContext);

    const navigate = useNavigate()

    return (
        <div className="login-page">
            <div className="login-modal">
                <form action="" className="login">
                    <label className="email"><span className="input-title">Email: </span><input type="email" name="" id="email" /></label>
                    <label className="password"><span className="input-title">Password: </span><input type="password" name="" id="password" /></label>
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
