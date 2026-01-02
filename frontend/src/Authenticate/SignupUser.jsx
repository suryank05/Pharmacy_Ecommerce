import React, { useState } from "react";
import { registerUser } from "../Service/UserService";
import { login } from "../Service/AuthenticationService";
import { useNavigate } from "react-router-dom";
import ForgetPassword from "../Components/ForgetPassword";
import "./SignupUser.css";

const SignupUser = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0); // 0: signup, 1: login, 2: forget password

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    gender: "",
    address: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const validateSignup = () => {
    const newErrors = {};
    
    // Full Name validation
    if (!signupData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (!/^[a-zA-Z\s]{2,50}$/.test(signupData.fullName)) {
      newErrors.fullName = "Name should contain only letters and be 2-50 characters";
    }
    
    // Email validation
    if (!signupData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@gmail\.com$/.test(signupData.email)) {
      newErrors.email = "Please enter a valid Gmail address (example@gmail.com)";
    }
    
    // Date of Birth validation
    if (!signupData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const today = new Date();
      const birthDate = new Date(signupData.dateOfBirth);
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 13 || age > 120) {
        newErrors.dateOfBirth = "Age must be between 13 and 120 years";
      }
    }
    
    // Phone validation
    if (!signupData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(signupData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid 10-digit Indian mobile number";
    }
    
    // Gender validation
    if (!signupData.gender) {
      newErrors.gender = "Gender is required";
    }
    
    // Password validation
    if (!signupData.password) {
      newErrors.password = "Password is required";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(signupData.password)) {
      newErrors.password = "Password must be 8+ chars with uppercase, lowercase, number & special character";
    }
    
    // Confirm Password validation
    if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateSignup()) {
      return;
    }
    
    try {
      await registerUser({
        fullName: signupData.fullName,
        emailId: signupData.email,
        username: signupData.email,
        dateOfBirth: signupData.dateOfBirth,
        phoneNumber: signupData.phoneNumber,
        gender: signupData.gender,
        address: signupData.address || null,
        password: signupData.password,
        role: "ROLE_USER"
      });
      alert("Signup successful");
      setPage(1);
    } catch (err) {
      console.error("Signup error:", err.response || err);
      if (err.response?.status === 400) {
        const errorMessage = err.response.data;
        if (errorMessage.includes("Email already exists")) {
          setErrors({ email: "This email is already registered" });
        } else if (errorMessage.includes("Gmail")) {
          setErrors({ email: "Only Gmail addresses are allowed" });
        } else {
          setErrors({ general: errorMessage });
        }
      } else {
        setErrors({ general: "Registration failed. Please try again." });
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(loginData);
      localStorage.setItem("token", response.data.token);
      alert("Login successful");
      navigate("/pharmacies");
    } catch (err) {
      console.error("Login error:", err.response || err);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-image">
        <div className="brand-content">
          <h1>PharmaSetu</h1>
          <p>Your trusted healthcare companion. Connect with verified pharmacies, order medicines safely, and manage your health with cutting-edge technology.</p>
        </div>
      </div>

      <div className="signup-right">
        <div className="signup-container">

          {/* FORGET PASSWORD */}
          {page === 2 && (
            <ForgetPassword onBack={() => setPage(1)} />
          )}

          {/* TOGGLE (OUTSIDE FORMS) */}
          {page !== 2 && (
            <div className="auth-toggle">
              <button
                type="button"
                onClick={() => setPage(0)}
                className={page === 0 ? "active" : ""}
              >
                Sign Up
              </button>

              <button
                type="button"
                onClick={() => setPage(1)}
                className={page === 1 ? "active" : ""}
              >
                Login
              </button>
            </div>
          )}

          {/* SIGNUP */}
          {page === 0 && (
            <form onSubmit={handleSignupSubmit} className="signup-form">
              <h2>Create Account</h2>

              {errors.general && <div className="error-message">{errors.general}</div>}

              <input
                type="text"
                name="fullName"
                placeholder="Full Name *"
                value={signupData.fullName}
                onChange={handleSignupChange}
                className={errors.fullName ? "error" : ""}
                required
              />
              {errors.fullName && <span className="error-text">{errors.fullName}</span>}

              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={signupData.email}
                onChange={handleSignupChange}
                className={errors.email ? "error" : ""}
                required
              />
              {errors.email && <span className="error-text">{errors.email}</span>}

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="date"
                    name="dateOfBirth"
                    placeholder="Date of Birth *"
                    value={signupData.dateOfBirth}
                    onChange={handleSignupChange}
                    className={errors.dateOfBirth ? "error" : ""}
                    required
                  />
                  {errors.dateOfBirth && <span className="error-text">{errors.dateOfBirth}</span>}
                </div>
                <div className="form-group">
                  <select
                    name="gender"
                    value={signupData.gender}
                    onChange={handleSignupChange}
                    className={errors.gender ? "error" : ""}
                    required
                  >
                    <option value="">Select Gender *</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <span className="error-text">{errors.gender}</span>}
                </div>
              </div>

              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number *"
                value={signupData.phoneNumber}
                onChange={handleSignupChange}
                className={errors.phoneNumber ? "error" : ""}
                maxLength="10"
                required
              />
              {errors.phoneNumber && <span className="error-text">{errors.phoneNumber}</span>}

              <textarea
                name="address"
                placeholder="Address (Optional)"
                value={signupData.address}
                onChange={handleSignupChange}
                rows="2"
              />

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password *"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    className={errors.password ? "error" : ""}
                    required
                  />
                  {errors.password && <span className="error-text">{errors.password}</span>}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password *"
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                    className={errors.confirmPassword ? "error" : ""}
                    required
                  />
                  {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                </div>
              </div>

              <button type="submit">Sign Up</button>
            </form>
          )}

          {/* LOGIN */}
          {page === 1 && (
            <form onSubmit={handleLoginSubmit} className="login-form">
              <h2>Login</h2>

              <input
                type="text"
                name="username"
                placeholder="Email"
                value={loginData.username}
                onChange={handleLoginChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />

              <button type="submit">Login</button>
              
              <button 
                type="button" 
                onClick={() => setPage(2)}
                className="forgot-link"
              >
                Forgot Password?
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default SignupUser;
