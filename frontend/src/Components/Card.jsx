import { useNavigate } from "react-router-dom";
import "./CardComponent.css";

function Card({ id, name, address, email }) {
    const navigate = useNavigate();

    const handleViewDetails = () => {
        navigate(`/pharmacy/${id}`);
    };

    return (
        <div className="pharmacy-card netflix-card">
            <div className="card-header">
                <div className="pharmacy-icon">💊</div>
            </div>
            
            <div className="card-content">
                <h3 className="pharmacy-name">{name}</h3>
                
                <p className="pharmacy-address">
                    📍 {address}
                </p>
                
                <p className="pharmacy-email">
                    ✉️ {email}
                </p>
                
                <button className="view-btn" onClick={handleViewDetails}>
                    🔍 View Details
                </button>
            </div>
        </div>
    );
}

export default Card;
