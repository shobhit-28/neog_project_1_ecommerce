import './footer.css'
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";


export const Footer = () => {
    return (
        <div className="footer">
            <div className="links">
                <a href="https://twitter.com/Shobhit28573001" className="twitter"><FaTwitter /></a>
                <a href="https://github.com/shobhit-28/" className="github"><FaGithub /></a>
                <a href="https://www.linkedin.com/in/shobhit-raj-19a588215/" className="linkedin"><FaLinkedin /></a>
            </div>
            <p className="copyright">
                © No Copyright, Developed by <a href="https://github.com/shobhit-28/" className="shobhit">Shobhit Raj</a>
            </p>
        </div>
    )
}
