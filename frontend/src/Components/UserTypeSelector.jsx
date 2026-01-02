import React, { useState } from "react";
import SignupUser from "../Authenticate/SignupUser";
import PharmacyLogin from "./PharmacyLogin";
import "./UserTypeSelector.css";

const UserTypeSelector = () => {
  const [userType, setUserType] = useState(null); // null, 'user', 'pharmacy'

  if (userType === 'user') {
    return <SignupUser onBack={() => setUserType(null)} />;
  }

  if (userType === 'pharmacy') {
    return <PharmacyLogin onBack={() => setUserType(null)} />;
  }

  return (
    <div className="user-type-page">
      <div className="selector-container">
        <h1>Choose Your Account Type</h1>
        <p>Select how you want to access PharmaSetu</p>

        <div className="type-cards">
          <div className="type-card" onClick={() => setUserType('user')}>
            <div className="card-icon">👤</div>
            <h3>User Account</h3>
            <p>Browse pharmacies, order medicines, manage your health</p>
            <button className="select-btn">Continue as User</button>
          </div>

          <div className="type-card" onClick={() => setUserType('pharmacy')}>
            <div className="card-icon">🏪</div>
            <h3>Pharmacy Account</h3>
            <p>Manage your pharmacy, add medicines, serve customers</p>
            <button className="select-btn">Continue as Pharmacy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelector;