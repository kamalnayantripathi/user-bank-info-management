import { toast } from "react-toastify";
import "../stylesheets/BankForm.css"
import { useState, useEffect } from "react";

const BankForm = ({ handleFormClose, type, accountData, token, loggedInUser, fetchUserBankAccounts }) => {
    const [formData, setFormData] = useState({
        bankName: "",
        branchName: "",
        accountHolderName: "",
        accountNumber: "",
        ifscCode: ""
    });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const id = loggedInUser?._id;
    const bankId = accountData?._id;

    // Prefill form when accountData changes
    useEffect(() => {
        if (accountData) {
            setFormData({
                bankName: accountData.bankName || "",
                branchName: accountData.branchName || "",
                accountHolderName: accountData.accountHolderName || "",
                accountNumber: accountData.accountNumber || "",
                ifscCode: accountData.ifscCode || ""
            });
        }
    }, [accountData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true)

        try {
            const url =
                type === "Update"
                    ? `${import.meta.env.VITE_BACKEND_URL}/api/user/${id}/account/${bankId}`
                    : `${import.meta.env.VITE_BACKEND_URL}/api/user/${id}/account`;

            const method = type === "Update" ? "PATCH" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json(); // Always parse JSON
            if (response.ok) {
                toast.success(`${type} successful!`);
                fetchUserBankAccounts();
                handleFormClose();
            } else {
                setErrorMsg(data.message || "Something went wrong.")
                toast.error(data.message || "Something went wrong.");
            }
            setLoading(false);
            return;
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Network error. Please try again.");
        }
    };

   return (
            <div className="bank-form-container">
                <div className="form-heading">
                    <h3>{type} Bank</h3>
                    <button onClick={handleFormClose}>Close</button>
                </div>
                <form className="bank-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="bankName"
                        placeholder="Enter Bank Name"
                        value={formData.bankName}
                        onChange={handleChange}
                    />
                    <p className="field-hint">Bank name is required.</p>

                    <input
                        type="text"
                        name="branchName"
                        placeholder="Enter Branch Name"
                        value={formData.branchName}
                        onChange={handleChange}
                    />
                    <p className="field-hint">Branch name is required.</p>

                    <input
                        type="text"
                        name="accountHolderName"
                        placeholder="Enter Holder Name"
                        value={formData.accountHolderName}
                        onChange={handleChange}
                    />
                    <p className="field-hint">Only letters and spaces allowed.</p>

                    <input
                        type="text"
                        name="accountNumber"
                        placeholder="Enter Account Number"
                        value={formData.accountNumber}
                        onChange={handleChange}
                    />
                    <p className="field-hint">Account number must be 9-18 digits.</p>

                    <input
                        type="text"
                        name="ifscCode"
                        placeholder="IFSC Code"
                        value={formData.ifscCode}
                        onChange={handleChange}
                    />
                    <p className="field-hint">Example: SBIN0001234 (11 characters).</p>

                    {errorMsg && <p className="error-text">{errorMsg}</p>}
                    <button type="submit" disabled={loading}>
                        {loading ? "Please wait..." : "Submit"}
                    </button>
                </form>
            </div>
        );

};

export default BankForm;
