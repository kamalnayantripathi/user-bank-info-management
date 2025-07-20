import "../stylesheets/Home.css";

const Home = () => {
    return (
        <>
            <main>
                {/* Notice/Disclaimer Section */}
                <div className="notice-section">
                    <h3>Important Information</h3>
                    <p>
                        If you're exploring the app, you can **register as a User** to add and manage bank accounts.
                    </p>
                    <p>
                        For Admin access (view-only), use the following credentials:
                        <br />
                        <b>Username:</b> Task Planet  
                        <br />
                        <b>Password:</b> taskplanet
                    </p>
                    <p>
                        Note: Admins can only view and filter bank accounts, not delete or modify them.
                    </p>
                </div>

                <div className="main-div-update">
                    <h2>Update: Stake option is available</h2>
                </div>
                <div className="main-div-content">
                    <div className="start-earning-box"> 
                        <div className="start-earning-box-heading">
                            <div className="start-earning-heading-and-image">
                                <h3>Earn Up to 10,00,000</h3>
                                <img className="orange_star_img" src="orange_star.png" alt="" />
                            </div>
                            <h3>/Month</h3>
                        </div>
                        <div className="start-earning-desc">
                            <p>Complete your task and Boost your Leaderboard Rank instantly</p>
                            <img className="stairs_image" src="increasing_stairs_with_arrow.png" alt="" />
                        </div>
                        <button className="start-earning-button">Start Earning</button>
                    </div>
                    <div className="add-payment-box">
                        <h3>Add payment options</h3>
                        <div className="add-payment-options">
                            <p>Wallet</p>
                            <div>
                                <p>$0.00</p>
                                <img className="white_star_img" src="white_star.png" alt="" />
                            </div>
                        </div>
                        <div className="add-payment-options">
                            <p>Points</p>
                            <div>
                                <p>50</p>
                                <img className="white_star_img" src="white_star.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-div-multiplayer-quiz">
                    <div className="multiplayer-quiz-content">
                        <h3>Multiplayer Quiz</h3>
                        <p>Increase your leaderboard rank with every Quiz</p>
                    </div>
                    <button>PLAY NOW</button>   
                </div>
            </main>
        </>
    );
};

export default Home;
