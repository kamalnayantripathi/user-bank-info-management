import "../stylesheets/Profile.css"

const Profile = () => {
    return(
        <>
            <div className="profile-page-container">
                <div className="profile-heading">
                    <div className="profile-image-circle">
                        <img className="profile-image" src="user_profile.png" alt="" />
                    </div>
                    <div className="profile-image-points">
                        <span>Get 50</span>
                        <img className="points-image" src="white_star.png" alt="" />
                    </div>
                    <div className="profile-image-content">
                        <h3>Rockkyy Bhaii</h3>
                        <p>@rockkypjf0</p>
                    </div>
                </div>
                <div className="profile-content">
                <div className="profile-content-headings">
                    <h3>My Profile</h3>
                    <button>Add bank account</button>
                </div>
                <div className="profile-content-body">
                    <div className="account-info">
                        <h3>Personal information</h3>
                        <div className="details">
                            <p className="details-label">Name</p>
                            <p className="details-value">Rockkyy Bhaii</p>
                        </div>
                        <div className="details">
                            <p className="details-label">Username</p>
                            <p className="details-value">@rockkypjf0</p>
                        </div>
                        <div className="details">
                            <p className="details-label">Email</p>
                            <p>tripathikamalnayan3@gmail.com</p>
                        </div>
                        <div className="details">
                            <p className="details-label">Whatsapp</p>
                            <p>+91 9076537901</p>
                        </div>
                        <div className="details">
                            <p className="details-label">Country</p>
                            <p className="details-value">India</p>
                        </div>
                        <div className="details">
                            <p className="details-label">Date of Birth</p>
                            <p className="details-value">12-Dec-2003</p>
                        </div>
                    </div>
                    <div className="bank-account-details">
                        <h3>Bank Account Details</h3>
                        <div className="bank-details">
                            <p>Account 1</p>
                            <p>IFSC Code: SBIN0001234</p>
                            <p>Branch: Main Branch</p>
                            <p>Bank: State Bank of India</p>
                            <p>Account: ****5678</p>
                            <p>Holder: Rockkyy Bhaii</p>
                        </div>
                        <div className="bank-details">
                            <p>Account 2</p>
                            <p>IFSC Code: HDFC0001234</p>
                            <p>Branch: City Branch</p>
                            <p>Bank: HDFC Bank</p>
                            <p>Account: ****9012</p>
                            <p>Holder: Rockkyy Bhaii</p>
                        </div>
                        <div className="bank-details">
                            <p>Account 3</p>
                            <p>IFSC Code: ICIC0001234</p>
                            <p>Branch: Central Branch</p>
                            <p>Bank: ICICI Bank</p>
                            <p>Account: ****3456</p>
                            <p>Holder: Rockkyy Bhaii</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default Profile;