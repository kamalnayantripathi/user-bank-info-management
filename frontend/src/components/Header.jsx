import "../stylesheets/Header.css"
import { useState } from "react"
import Login from "./LoginForm"
import { useNavigate } from "react-router-dom"

const Header = () => {

    const [role, setRole] = useState("User")
    const [profIconClicked, setProfIconClicked] = useState(false)
    const [showLoginForm, setShowLoginForm] = useState(false)
    const [formType, setFormType] = useState("Login")
    const token = localStorage.getItem("token")
    const navigate = useNavigate();

    const handleFormClose = () => {
        setShowLoginForm(false)
    }

    const handleLoginClicked = () => {
        setRole("User")
        setFormType("Login")
        setShowLoginForm(true)
        setProfIconClicked(false)
    }

    const handleAdminClicked = () => {
        setRole("Admin")
        setFormType("Login")
        setShowLoginForm(true)
        setProfIconClicked(false)
    }
    const handleSignUpClicked = () => {
        setRole("User")
        setFormType("Signup")
        setShowLoginForm(true)
        setProfIconClicked(false)
    }
    console.log(role)
    const handleLogoutClick = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        navigate("/")
    }

    return (
        <>
            <header>
                <nav>
                    <ul className="nav-links">
                        <li className="nav-heading">
                            <a href="/">Task Planet</a>
                        </li>
                        <li className="end-nav-links">
                            <div className="wallet-and-points">
                                <div className="nav-points">
                                    <a href="">50</a>
                                    <img src="white_star.png" alt="" />
                                </div>
                                <a className="nav-wallet" href="">$0.0000</a>
                            </div>
                            <div className="profile-icon-container">
                                {/* <a className="profile-icon" href="">&#128100;</a> */}
                                <a className="profile-icon">
                                    <img 
                                        onClick={()=>setProfIconClicked(!profIconClicked)} 
                                        className="user-profile-img" 
                                        src="user_profile.png" 
                                        alt="" 
                                    />
                                </a>
                                { !token && profIconClicked && (
                                    <div className="login-signup-links">
                                        <a onClick={handleSignUpClicked}>Sign Up</a>
                                        <a onClick={handleLoginClicked} >Login</a>
                                        <a onClick={handleAdminClicked} >Admin</a>
                                    </div>
                                )} 
                                { token && profIconClicked && (
                                    <div className="login-signup-links">
                                        <a onClick={()=>navigate("/my-profile")}>My profile</a>
                                        <a onClick={handleLogoutClick}>Logout</a>
                                    </div>
                                )}
                            </div>
                        </li>
                    </ul>
                </nav>
            </header>
            {   showLoginForm && (
                <div className="form-overlay">
                    <Login handleFormClose={handleFormClose} role={role} formType={formType} />
                </div>  
            )}
        </>
    )
}

export default Header;