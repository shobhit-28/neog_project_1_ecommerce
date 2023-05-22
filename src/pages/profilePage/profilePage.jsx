import { useContext } from 'react'
import './profilePage.css'
import { AuthContext } from '../../contexts/authContext'

export const ProfilePage = () => {
    const {logOut} = useContext(AuthContext)

  return (
    <div className="profile-page">
        <div className="profile-modal">
            <p className="user-name">{localStorage.getItem('userName')}</p>
            <p className="user-name">{localStorage.getItem('userEmail')}</p>
            <button className="logout" onClick={logOut}>Logout</button>
        </div>
    </div>
  )
}
