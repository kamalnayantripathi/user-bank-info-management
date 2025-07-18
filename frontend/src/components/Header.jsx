import "../stylesheets/Header.css"

const Header = () => {
    return (
        <>
            <header>
                <nav>
                    <ul className="nav-links">
                        <li className="nav-heading">
                            <a href="">Task Planet</a>
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
                                <a className="profile-icon" href="">
                                    <img className="user-profile-img" src="user_profile.png" alt="" />
                                </a>
                            </div>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Header;