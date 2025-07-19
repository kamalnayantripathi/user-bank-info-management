import "../stylesheets/AdminProfile.css"
const AdminProfile = () => {

    return(
        <>
            <div className="admin-profile-page-container">
                <div className="admin-profile-heading">
                    <div className="admin-profile-image-circle">
                        <img className="admin-profile-image" src="user_profile.png" alt="" />
                    </div>
                    <div className="admin-profile-image-points">
                        <span>Get 50</span>
                        <img className="points-image" src="white_star.png" alt="" />
                    </div>
                    <div className="admin-profile-image-content">
                        <h3>Rockkyy Bhaii</h3>
                        <p>@rockkypjf0</p>
                    </div>  
                </div>
                <div className="admin-profile-content">
                    <div className="admin-profile-content-headings">
                        <h3>All Bank Accounts</h3>
                        <div className="admin-profile-filters-container">
                            <h3>Filter</h3>
                            <div className="search-container">
                                <input type="text" placeholder="Search by Username, Bank Name, or IFSC..." />
                                <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
                                </svg>
                            </div>
                            <div className="dropdown-filters">
                                <select name="Branch" id="Branch">
                                    <option value="Main">Main branch</option>
                                    <option value="City">City branch</option>
                                    <option value="Central">Central branch</option>
                                </select>
                                <select name="Bank" id="Bank">
                                    <option value="State Bank of India">State Bank of India</option>
                                    <option value="HDFC Bank">HDFC Bank</option>
                                    <option value="ICICI Bank">ICICI Bank</option>
                                    <option value="Bank of Baroda">Bank of Baroda</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="admin-profile-content-body">
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
            </div>
        </>
    )
}


export default AdminProfile;

