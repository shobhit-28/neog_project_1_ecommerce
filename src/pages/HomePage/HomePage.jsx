import { useContext } from "react"
import { DataContext } from "../../contexts/dataContext"
import './HomePage.css'
import { useNavigate } from "react-router"

export const HomePage = () => {
    const { responseData } = useContext(DataContext);
    const navigate = useNavigate();
    
    return (
        <div className="landing-page">
            <div className="front-img">
                <p className="img-head">
                    Discover the Ultimate Shopping Experience at Raj-Kart <br />
                    Your One-Stop Destination for All Your Shopping Needs!
                </p>
            </div>
            <div className="category-img-container">
                <img src="https://res.cloudinary.com/donqbxlnc/image/upload/v1648895557/fashify/0b21bba9-e1e2-4dd9-ac99-4a759abe68801648705771876-Shop-By-Category_w2adx7.webp" alt="Shop by category" />
            </div>
            <div className="categories-parent">
                {responseData?.productCategories?.categories?.map((category) => (
                    <div className="categories" key={category?.id} onClick={() => navigate(`category/${category?.categoryName}`)} >
                        <div className="img-container">
                            <img src={category?.image} alt="" />
                        </div>
                        <p className="category-head">{category?.categoryName.toUpperCase()}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}