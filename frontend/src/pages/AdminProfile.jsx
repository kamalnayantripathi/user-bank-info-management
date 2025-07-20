import "../stylesheets/AdminProfile.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const AdminProfile = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [adminData, setAdminData] = useState({});
  const [allBankAccounts, setAllBankAccounts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedBank, setSelectedBank] = useState("");

  // Fetch admin details
  const fetchAdminDetails = async () => {
    const url = import.meta.env.VITE_BACKEND_URL + "/api/current-user";
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setAdminData(data.user);
      }
    } catch (error) {
      toast.error(error.message);;
    }
  };

  // Fetch all bank accounts
  const fetchAllBankAccounts = async () => {
    const url = import.meta.env.VITE_BACKEND_URL + "/api/user/accounts";
    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setAllBankAccounts(data.banks);
      }
    } catch (error) {
      toast.error(error.message);;
    }
  };

  useEffect(() => {
    if (token && role === "Admin") {
      fetchAdminDetails();
      fetchAllBankAccounts();
    }
  }, []);

  // Handle search & filter
  const handleSearch = async () => {
    let queryParams = [];
    if (searchText) queryParams.push(`search=${encodeURIComponent(searchText)}`);
    if (selectedBranch) queryParams.push(`branchName=${encodeURIComponent(selectedBranch)}`);
    if (selectedBank) queryParams.push(`bankName=${encodeURIComponent(selectedBank)}`);

    const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";
    const url = import.meta.env.VITE_BACKEND_URL + `/api/user/filtered-accounts${queryString}`;

    try {
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setAllBankAccounts(data.banks);
      }
    } catch (error) {
      toast.error(error.message);;
    }
  };

  return (
    <div className="admin-profile-page-container">
      {/* Profile Section */}
      <div className="admin-profile-heading">
        <div className="admin-profile-image-circle">
          <img className="admin-profile-image" src="user_profile.png" alt="Profile" />
        </div>
        <div className="admin-profile-image-points">
          <span>Get 50</span>
          <img className="points-image" src="white_star.png" alt="Points" />
        </div>
        <div className="admin-profile-image-content">
          <h3>{adminData?.username}</h3>
          <p>{adminData?.role}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="admin-profile-content">
        <div className="admin-profile-content-headings">
          <h3>All Bank Accounts</h3>

          {/* Filters */}
          <div className="admin-profile-filters-container">
            <h3>Filter</h3>

            {/* Search Input */}
            <div className="search-container">
                <label>Search:</label>
                <input
                type="text"
                placeholder="Search by Username, Bank Name, or IFSC..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                />
            </div>

            {/* Dropdown Filters */}
            <div className="dropdown-filters">
                <label>Branch:</label>
                <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
                <option value="">All Branches</option>
                <option value="Main">Main branch</option>
                <option value="City">City branch</option>
                <option value="Central">Central branch</option>
                </select>

                <label>Bank:</label>
                <select value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)}>
                <option value="">All Banks</option>
                <option value="State Bank of India">State Bank of India</option>
                <option value="HDFC Bank">HDFC Bank</option>
                <option value="ICICI Bank">ICICI Bank</option>
                <option value="Bank of Baroda">Bank of Baroda</option>
                </select>
            </div>

            {/* Search Button at the Bottom */}
            <button className="filter-search-btn" onClick={handleSearch}>
                Search
            </button>
            </div>
        </div>

        {/* Bank Accounts */}
        <div className="admin-profile-content-body">
          <div className="bank-account-details">
            <h3>Bank Account Details</h3>
            {allBankAccounts?.map((acc, ind) => (
              <div key={acc._id} className="bank-details">
                <p><b>Account {ind + 1}</b></p>
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
    </div>
  );
};

export default AdminProfile;
