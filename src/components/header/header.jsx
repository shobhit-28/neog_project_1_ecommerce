import { NavLink, Link, useNavigate } from "react-router-dom"
import React, { useContext, useState } from "react";
import { FaSearch, FaTimes, FaAlignJustify } from "react-icons/fa";
import './header.css';
import { ProductReducerContext } from "../../contexts/productReducerContext/productReducerContext";

export const Header = () => {
    const { searchHandler, searchData, isSearchModalOpen } = useContext(ProductReducerContext);
    const [menuState, setMenuState] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <div className='header' >
                <Link to='/' className="nav-head">Raj-Kart</Link>
                <div className="search">
                    <input type="text" name="search" id="search" placeholder="search" onChange={searchHandler} />
                    <button><FaSearch /></button>
                </div>
                <div className="menuButtons">
                    <button className="menuBtn" onClick={() => setMenuState(!menuState)}> {menuState ? <FaTimes /> : <FaAlignJustify />}  </button>
                </div>
                <nav className="nav-links">
                    <NavLink to='/products' className='nav-link'>Explore</NavLink>
                    <NavLink to='/wishlist' className='nav-link'>Wishlist</NavLink>
                    <NavLink to='/cart' className='nav-link'>Cart</NavLink>
                    <NavLink to='/sign-in' className='nav-link'>Login</NavLink>
                </nav>
            </div>
            {searchData.length > 0 && isSearchModalOpen && <div className="search-results">
                {searchData.map((product) => (
                    <div className="search-result" key={product?.id} onClick={() => navigate(`product/${product?.id}`)} >
                        <div className="img-container">
                            <img src={product?.thumbnail} alt={product?.title} />
                        </div>
                        <div className="content">
                            <div className="title-price">
                                <p className="product-title">{product.title}</p>
                                <p className="product-price">{`₹ ${Math.round(((product.price * 82.34) - (product.price * 82.34) * (product.discountPercentage / 100)))}`}</p>
                            </div>
                            <p className="brand">
                                {product.brand}
                            </p>
                            <p className="desc">
                                {product.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div >}
            {
                menuState && <div className="menu-links">
                    <nav className="menu-nav-links">
                        <NavLink to='/products' className='nav-link'>Explore</NavLink>
                        <NavLink to='/wishlist' className='nav-link'>Wishlist</NavLink>
                        <NavLink to='/cart' className='nav-link'>Cart</NavLink>
                        <NavLink to='/sign-in' className='nav-link'>Login</NavLink>
                    </nav>
                </div>
            }
        </>
    )
}