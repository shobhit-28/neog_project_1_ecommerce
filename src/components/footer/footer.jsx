/* eslint-disable react/jsx-no-target-blank */
import './footer.css'
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";


export const Footer = () => {
    return (
        <div className="footer">
            <div className="links">
                <a href="https://twitter.com/Shobhit28573001" className="twitter" target='_blank'><FaTwitter /></a>
                <a href="https://github.com/shobhit-28/neog_project_1_ecommerce" className="github" target='_blank'><FaGithub /></a>
                <a href="https://www.linkedin.com/in/shobhit-raj-19a588215/" className="linkedin" target='_blank'><FaLinkedin /></a>
            </div>
            <p className="copyright">
                © No Copyright, Developed by <a href="https://github.com/shobhit-28/" className="shobhit" target='_blank'>Shobhit Raj</a>
            </p>
        </div>
    )
}
