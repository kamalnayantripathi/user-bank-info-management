import "../stylesheets/Profile.css"
import BankForm from "../components/BankForm"
import { useState } from "react"

const Profile = () => {
    const [showBankForm, setShowBankForm] = useState(false)
    console.log(showBankForm)

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
                        <button onClick={() => setShowBankForm(!showBankForm)}>Add bank</button>
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
                                <p><b>Account 1</b></p>
                                <p><b>IFSC Code:</b> SBIN0001234</p>
                                <p><b>Branch:</b> Main Branch</p>
                                <p><b>Bank:</b> State Bank of India</p>
                                <p><b>Account:</b> ****5678</p>
                                <p><b>Holder:</b> Rockkyy Bhaii</p>
                            </div>
                            <div className="bank-details">
                                <p><b>Account 2</b></p>
                                <p><b>IFSC Code:</b> HDFC0001234</p>
                                <p><b>Branch:</b> City Branch</p>
                                <p><b>Bank:</b> HDFC Bank</p>
                                <p><b>Account:</b> ****9012</p>
                                <p><b>Holder:</b> Rockkyy Bhaii</p>
                            </div>
                            <div className="bank-details">
                                <p><b>Account 3</b></p>
                                <p><b>IFSC Code:</b> ICIC0001234</p>
                                <p><b>Branch:</b> Central Branch</p>
                                <p><b>Bank:</b> ICICI Bank</p>
                                <p><b>Account:</b> ****3456</p>
                                <p><b>Holder:</b> Rockkyy Bhaii</p>
                            </div>
                        </div>
                    </div>
                </div>
                { showBankForm && (
                    <div className="form-overlay">
                        <BankForm handleFormClose={()=>setShowBankForm(!showBankForm)} />
                    </div>
                )}
            </div>
        </>
    )
}

export default Profile;