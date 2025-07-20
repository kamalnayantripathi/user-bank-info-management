import "../stylesheets/LoginForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ handleFormClose, role, formType }) => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isUser = role === "User";
  const isLogin = formType === "Login";

  // Decide which fields to show
  const showEmail = isUser;                  // user login/signup both use email
  const showUsernameSignup = isUser && !isLogin; // username for user signup
  const showUsernameLogin = !isUser;         // admin login uses username

  // Derived endpoints
  const USER_SIGNUP_ENDPOINT = "/account";
  const USER_LOGIN_ENDPOINT = "/login";
  const ADMIN_LOGIN_ENDPOINT = "/admin/login";

  // Generic helper to call backend
  const postJson = async (endpoint, bodyObj) => {
    const url = import.meta.env.VITE_BACKEND_URL + "/api" + endpoint;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyObj)
    });
    const data = await res.json();
    return { ok: res.ok, data };
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      if (!isUser && !isLogin) {
        setErrorMsg("Admin signup is not allowed.");
        setLoading(false);
        return;
      }

      if (isUser && !isLogin) {
        // USER SIGNUP FLOW
        const signupPayload = {
            username: formData.username,
            email: formData.email,
            password: formData.password
        };

        // Basic presence validation
        if (Object.values(signupPayload).some(v => !v || v.trim() === "")) {
            setErrorMsg("All fields are required.");
            setLoading(false);
            return;
        }

        const signupRes = await postJson(USER_SIGNUP_ENDPOINT, signupPayload);

        if (!signupRes.ok) {
            setErrorMsg(signupRes.data.message || "Signup failed.");
            setLoading(false);
            return;
        }

        // Auto-login after successful signup
        const loginRes = await postJson(USER_LOGIN_ENDPOINT, {
            email: formData.email,
            password: formData.password
        });

        if (loginRes.ok && loginRes.data.token) {
            localStorage.setItem("token", loginRes.data.token);
            localStorage.setItem("role", "User");
            navigate("/my-profile");
            handleFormClose();
        } else {
            setErrorMsg(loginRes.data.message || "Auto-login failed.");
        }
        setLoading(false);
        return;
      }

      if (isUser && isLogin) {
        // USER LOGIN
        const loginPayload = {
            email: formData.email,
            password: formData.password
        };
        if (Object.values(loginPayload).some(v => !v || v.trim() === "")) {
            setErrorMsg("Email & password required.");
            setLoading(false);
            return;
        }
        const loginRes = await postJson(USER_LOGIN_ENDPOINT, loginPayload);
        if (!loginRes.ok) {
            setErrorMsg(loginRes.data.message || "Login failed.");
            setLoading(false);
            return;
        }
        localStorage.setItem("token", loginRes.data.token);
        localStorage.setItem("role", "User");
        navigate("/my-profile");
        handleFormClose();
        setLoading(false);
        return;
      }

      // ADMIN LOGIN
      if (!isUser && isLogin) {
        const adminPayload = {
            username: formData.username,
            password: formData.password
        };
        if (Object.values(adminPayload).some(v => !v || v.trim() === "")) {
            setErrorMsg("Username & password required.");
            setLoading(false);
            return;
        }
        const adminRes = await postJson(ADMIN_LOGIN_ENDPOINT, adminPayload);
        if (!adminRes.ok) {
            setErrorMsg(adminRes.data.message || "Admin login failed.");
            setLoading(false);
            return;
        }
        localStorage.setItem("token", adminRes.data.token);
        localStorage.setItem("role", "Admin");
        navigate("/admin-profile");
        handleFormClose();
        setLoading(false);
        return;
      }

    } catch (err) {
        console.error(err);
        setErrorMsg("Unexpected error. Try again.");
        setLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form-heading">
        <h3>{role} {formType}</h3>
        <button onClick={handleFormClose}>Close</button>
      </div>

      <div className="login-form-input">
        <form onSubmit={handleSubmit}>

          {/* Email (User only) */}
          {showEmail && (
            <input
              type="text"
              id="email"
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
          )}

            {/* Username for:
                - user signup (extra field)
                - admin login (primary identity)
              */}
          { (showUsernameSignup || showUsernameLogin) && (
            <input
              type="text"
              id="username"
              placeholder="username"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
            />
          )}

          <input
            type="password"
            id="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete={isLogin ? "current-password" : "new-password"}
          />

          {errorMsg && <p className="error-text">{errorMsg}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : formType}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
