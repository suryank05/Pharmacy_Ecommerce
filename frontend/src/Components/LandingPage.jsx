import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  useEffect(() => {
    // Create floating particles
    const createParticles = () => {
      const particlesContainer = document.querySelector('.floating-pills');
      if (!particlesContainer) return;
      
      for (let i = 0; i < 8; i++) {
        const pill = document.createElement('div');
        pill.className = 'pill';
        pill.style.left = Math.random() * 100 + '%';
        pill.style.animationDelay = Math.random() * 15 + 's';
        pill.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(pill);
      }
    };

    createParticles();
  }, []);

  return (
    <>
      <div className="netflix-bg"></div>
      <section className="hero">
        <div className="floating-pills"></div>
        
        <div className="hero-content fade-in">
          <h1 className="slide-in">PharmaSetu.</h1>
          <p className="fade-in">
            Experience the future of pharmacy services. Order medicines, 
            connect with trusted pharmacies, and manage your health 
            with cutting-edge technology.
          </p>

          <div className="hero-actions">
            <Link to="/signup" className="btn ghost">
              Sign In
            </Link>
            <Link to="/pharmacy/login" className="btn secondary">
              💊 Pharmacy Login
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
