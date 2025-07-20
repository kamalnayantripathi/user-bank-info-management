import "../stylesheets/Profile.css"
import BankForm from "../components/BankForm"
import ConfirmPopup from "../components/ConfirmPopup"
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Profile = () => {
    const [showBankForm, setShowBankForm] = useState(false)
    const [showPopup, setShowPopup] = useState(false);
    const [formType, setFormType] = useState("Add")
    console.log(showBankForm)
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const [userData, setUserData] = useState({});
    const [userBankAccounts, setUserBankAccounts] = useState([]);
    const [accountData, setAccountData] = useState({});
    console.log(accountData)

    const fetchUserDetails = async() => {
        const url = import.meta.env.VITE_BACKEND_URL+"/api/current-user";
        try { 
            const response = await fetch(url,{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if(response.ok){
                const data = await response.json();
                console.log(data)
                setUserData(data.user)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        if(token && role==="User"){
            fetchUserDetails();
        }
    },[])

    const fetchUserBankAccounts = async() => {
        console.log(userData)
        const url = import.meta.env.VITE_BACKEND_URL+`/api/user/${userData._id}/accounts`;
        try { 
            const response = await fetch(url,{
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            if(response.ok){
                const data = await response.json();
                console.log(data)
                setUserBankAccounts(data.banks)
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(()=>{
        fetchUserBankAccounts();
    },[userData])

    const confirmDelete = async() =>{
        if(userData?._id && accountData?._id){
            const url = import.meta.env.VITE_BACKEND_URL+`/api/user/${userData._id}/account/${accountData._id}`;
            try { 
                const response = await fetch(url,{
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                if(response.ok){
                    const data = await response.json();
                    console.log(data.message)
                    fetchUserBankAccounts();
                    setShowPopup(false)
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    }

    const handleUpdateAccount = (acc) => {
        setAccountData(acc)
        setFormType("Update");
        setShowBankForm(true);
    }

    const handleAddBankAccount = () => {
        setAccountData({})
        setFormType("Add");
        setShowBankForm(true);
    }

    const handleDeleteBankAccount = (acc) => {
        setAccountData(acc);
        setShowPopup(true);
    };

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
                        <h3>{userData.username}</h3>
                        <p>{userData.email}</p>
                    </div>
                </div>
                <div className="profile-content">
                    <div className="profile-content-headings">
                        <h3>My Profile</h3>
                        <button onClick={handleAddBankAccount}>Add bank</button>
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
                                <p className="details-value">{userData.username}</p>
                            </div>
                            <div className="details">
                                <p className="details-label">Email</p>
                                <p>{userData.email}</p>
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
                            { userBankAccounts?.map((acc, ind) => (
                                <div key={acc._id} className="bank-details">
                                    <p className="bank-details-header">
                                        <b>Account {ind+1}</b>
                                        <span className="bank-details-header-buttons">
                                            <button onClick={()=>handleUpdateAccount(acc)} className="update-button">Update</button>
                                            <button onClick={() => handleDeleteBankAccount(acc)} className="delete-button">Delete</button>
                                        </span>
                                    </p>
                                    <p><b>IFSC Code:</b> {acc.ifscCode}</p>
                                    <p><b>Branch:</b> {acc.branchName}</p>
                                    <p><b>Bank:</b> {acc.bankName}</p>
                                    <p><b>Account:</b> {acc.accountNumber}</p>
                                    <p><b>Holder:</b> {acc.accountHolderName}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                { showBankForm && (
                    <div className="form-overlay">
                        <BankForm 
                            handleFormClose={()=>setShowBankForm(!showBankForm)} 
                            type={formType} 
                            accountData={accountData}
                            token={token}
                            loggedInUser={userData}
                            fetchUserBankAccounts={fetchUserBankAccounts}
                        />
                    </div>
                )}
                {showPopup && (
                    <ConfirmPopup
                        message={`Are you sure you want to delete ${accountData.bankName}?`}
                        onConfirm={confirmDelete}
                        onCancel={() => setShowPopup(false)}
                    />
                )}
            </div>
        </>
    )
}

export default Profile;