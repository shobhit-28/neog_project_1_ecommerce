import { useContext } from 'react'
import './login.css'
import { DataContext } from '../../contexts/dataContext'

export const Login = () => {
    const { testLogin, logOut, isLoggedIn } = useContext(DataContext);

    return (
        <div className="login-page">
            <div className="login-modal">
                <label className="email"><span className="input-title">Email: </span><input type="email" name="" id="" /></label>
                <label className="password"><span className="input-title">Password: </span><input type="password" name="" id="" /></label>
                {isLoggedIn 
                ?
                <>
                    <button className="logout" onClick={logOut}>Logout</button>
                </>
                :
                <>
                    <button className="login">Login</button>
                    <button className="test-login" onClick={testLogin}>Test Login</button>
                </>}
            </div>
        </div>
    )
}
