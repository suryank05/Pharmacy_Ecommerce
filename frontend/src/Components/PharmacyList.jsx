import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "./Card";
import "./PharmacyList.css";

const PharmacyList = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await axios.get("http://localhost:8083/pharmacy/", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPharmacies(response.data);
      } catch (err) {
        console.error(err);
        alert("Error fetching pharmacies.");
      }
    };
    fetchPharmacies();
  }, [token]);

  const goToRegister = () => {
    navigate("/pharmacy/register");
  };

  return (
      <div className="pharmacies-page">
      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      >
    Logout
  </button>

      <div className="pharmacies-header">
        <h1>🏪 Trusted Pharmacies</h1>
        <div className="header-buttons">
          <button onClick={() => navigate("/order-history")} className="history-btn">
            📋 Order History
          </button>
          <button onClick={goToRegister}>
            ➕ Register Your Pharmacy
          </button>
        </div>
      </div>

      <div className="pharmacies-grid">
        {pharmacies.map((pharmacy) => (
          <Card
            key={pharmacy.id}
            id={pharmacy.id}
            name={pharmacy.pharmacyName}
            address={pharmacy.address || "N/A"}
            email={pharmacy.email}
          />
        ))}
      </div>
    </div>
  );
};

export default PharmacyList;
