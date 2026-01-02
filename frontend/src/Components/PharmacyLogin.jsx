import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../Service/AuthenticationService";
import ForgetPassword from "./ForgetPassword";
import "../Authenticate/SignupUser.css";

const PharmacyLogin = () => {
  const navigate = useNavigate();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(loginData);
      localStorage.setItem("token", response.data.token);
      alert("Pharmacy login successful!");
      navigate("/pharmacy/dashboard");
    } catch (err) {
      console.error("Login error:", err.response || err);
      alert("Invalid pharmacy credentials");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-image">
        <div className="brand-content">
          <h1>PharmaSetu</h1>
          <p>Welcome back to our pharmacy network. Access your dashboard, manage inventory, and serve your customers with our comprehensive pharmacy management system.</p>
        </div>
      </div>

      <div className="signup-right">
        <div className="signup-container">
          {showForgotPassword ? (
            <ForgetPassword onBack={() => setShowForgotPassword(false)} />
          ) : (
            <>
              <h2>🏪 Pharmacy Login</h2>
              
              <form onSubmit={handleSubmit} className="login-form">
                <input
                  type="email"
                  name="username"
                  placeholder="Pharmacy Email"
                  value={loginData.username}
                  onChange={handleChange}
                  required
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={handleChange}
                  required
                />

                <button type="submit">Login as Pharmacy</button>
                
                <button 
                  type="button" 
                  onClick={() => setShowForgotPassword(true)}
                  className="forgot-link"
                >
                  Forgot Password?
                </button>
              </form>

              <div className="login-links">
                <button onClick={() => navigate("/pharmacy/register")} className="register-link">
                  Register New Pharmacy
                </button>
                <button onClick={() => navigate("/signup")} className="user-link">
                  Login as User
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PharmacyLogin;