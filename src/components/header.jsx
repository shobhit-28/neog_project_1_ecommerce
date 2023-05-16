import { NavLink, Link } from "react-router-dom"
import { FaSearch } from "react-icons/fa";

export const Header = () => {
    return(
        <div className="header">
            <Link to='/' className="nav-head">Raj-Kart</Link>
            <div className="search">
                <input type="text" name="search" id="search" placeholder="search" />
                <button><FaSearch /></button>
            </div>
            <nav className="nav-links">
                <NavLink to='/products' className='nav-link'>Explore</NavLink>
                <NavLink to='/wishlist' className='nav-link'>Wihlist</NavLink>
                <NavLink to='/cart' className='nav-link'>Cart</NavLink>
                <NavLink to='/sign-in' className='nav-link'>Login</NavLink>
            </nav>
        </div>
    )
}