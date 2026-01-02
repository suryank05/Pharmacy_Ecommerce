import React, { useState } from "react";
import "./MockPaymentGateway.css";

const MockPaymentGateway = ({ isOpen, orderData, onSuccess, onClose }) => {
  const [step, setStep] = useState(1); // 1: Payment Options, 2: UPI, 3: Processing, 4: Confirming, 5: Success, 6: Final Success
  const [upiId, setUpiId] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [countdown, setCountdown] = useState(8);

  const handleContinueToUPI = () => {
    setStep(2);
  };

  const handlePayment = async () => {
    if (!upiId) {
      alert("Please enter UPI ID");
      return;
    }

    setStep(3);
    
    // Processing
    setTimeout(() => {
      setStep(4);
      
      // Confirming
      setTimeout(() => {
        const txnId = "razorpay_payment_" + Date.now();
        setTransactionId(txnId);
        setStep(5);
        
        // Start countdown
        let count = 8;
        const interval = setInterval(() => {
          count--;
          setCountdown(count);
          if (count <= 0) {
            clearInterval(interval);
            setStep(6);
            
            // Auto close after 2 seconds
            setTimeout(() => {
              handleSuccess();
            }, 2000);
          }
        }, 1000);
      }, 2000);
    }, 2000);
  };

  const handleSuccess = () => {
    onSuccess({
      razorpay_payment_id: "pay_" + Date.now(),
      razorpay_order_id: "order_" + Date.now(),
      razorpay_signature: "signature_" + Date.now(),
      transaction_id: transactionId
    });
    handleClose();
  };

  const handleClose = () => {
    setStep(1);
    setUpiId("");
    setTransactionId("");
    setCountdown(8);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="payment-overlay">
      <div className="payment-container">
        {/* Step 1: Payment Options */}
        {step === 1 && (
          <>
            <div className="payment-header-white">
              <h2>Payment Options</h2>
              <button onClick={handleClose} className="close-btn-dark">✕</button>
            </div>
            
            <div className="payment-content-white">
              <p className="section-label">All Payment Options</p>
              
              <div className="payment-option-card active" onClick={handleContinueToUPI}>
                <div className="option-left">
                  <span className="option-icon">💳</span>
                  <span className="option-text">UPI</span>
                  <div className="upi-icons">
                    <span>📱</span>
                    <span>💰</span>
                    <span>🏦</span>
                  </div>
                </div>
                <span className="arrow">›</span>
              </div>

              <div className="payment-grid">
                <div className="payment-method-btn">
                  <span>🔵</span> Google Pay
                </div>
                <div className="payment-method-btn">
                  <span>🟣</span> PhonePe
                </div>
                <div className="payment-method-btn">
                  <span>🔷</span> PayTM
                </div>
                <div className="payment-method-btn">
                  <span>⬛</span> CRED UPI
                </div>
              </div>

              <div className="payment-option-card">
                <div className="option-left">
                  <span className="option-icon">💳</span>
                  <span className="option-text">Cards</span>
                </div>
                <span className="arrow">›</span>
              </div>

              <div className="payment-option-card">
                <div className="option-left">
                  <span className="option-icon">🏦</span>
                  <span className="option-text">Netbanking</span>
                </div>
                <span className="arrow">›</span>
              </div>

              <div className="payment-option-card">
                <div className="option-left">
                  <span className="option-icon">👛</span>
                  <span className="option-text">Wallet</span>
                </div>
                <span className="arrow">›</span>
              </div>
            </div>

            <div className="payment-footer">
              <div className="amount-display">
                <span className="amount-label">₹{orderData?.total?.toFixed(2)}</span>
                <span className="view-details">View Details</span>
              </div>
              <button className="continue-btn-dark" onClick={handleContinueToUPI}>
                Continue
              </button>
            </div>
          </>
        )}

        {/* Step 2: UPI Entry */}
        {step === 2 && (
          <>
            <div className="payment-header-white">
              <button onClick={() => setStep(1)} className="back-btn">‹</button>
              <h2>UPI</h2>
              <button onClick={handleClose} className="close-btn-dark">✕</button>
            </div>
            
            <div className="payment-content-white">
              <p className="section-label">UPI Apps</p>
              
              <div className="payment-grid">
                <div className="payment-method-btn">
                  <span>🔵</span> Google Pay
                </div>
                <div className="payment-method-btn">
                  <span>🟣</span> PhonePe
                </div>
                <div className="payment-method-btn">
                  <span>🔷</span> PayTM
                </div>
                <div className="payment-method-btn">
                  <span>⬛</span> CRED UPI
                </div>
              </div>

              <p className="section-label">UPI ID / Number</p>
              
              <input
                type="text"
                placeholder="yourname@okhdfc"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="upi-input-field"
                style={{ background: 'white', color: '#333' }}
              />
            </div>

            <div className="payment-footer">
              <div className="amount-display">
                <span className="amount-label">₹{orderData?.total?.toFixed(2)}</span>
                <span className="view-details">View Details</span>
              </div>
              <button className="continue-btn-dark" onClick={handlePayment}>
                Continue
              </button>
            </div>
          </>
        )}

        {/* Step 3: Processing */}
        {step === 3 && (
          <div className="processing-modal">
            <h3>Processing your payment</h3>
            <p>This will only take a few seconds.</p>
            <div className="cart-animation">
              <div className="cart-icon">🛒</div>
            </div>
            <button className="cancel-btn" onClick={handleClose}>Cancel</button>
          </div>
        )}

        {/* Step 4: Confirming */}
        {step === 4 && (
          <div className="processing-modal">
            <h3>Confirming Payment</h3>
            <p>This will only take a few seconds.</p>
            <div className="cart-animation">
              <div className="cart-icon">🛒</div>
            </div>
            <div className="secured-by">Secured by <strong>Razorpay</strong></div>
          </div>
        )}

        {/* Step 5: Success with Countdown */}
        {step === 5 && (
          <div className="processing-modal">
            <p className="redirect-text">You will be redirected in {countdown} seconds</p>
            <h3 className="success-title">Payment Successful</h3>
            <div className="success-card-icon">💳✓</div>
            <div className="secured-by">Secured by <strong>Razorpay</strong></div>
          </div>
        )}

        {/* Step 6: Final Success */}
        {step === 6 && (
          <div className="final-success">
            <p className="redirect-text-white">You will be redirected in 2 seconds</p>
            <h3 className="success-title-white">Payment Successful</h3>
            <div className="success-check">✓</div>
            <div className="success-details">
              <div className="merchant-info">
                <h4>PharmaSetu</h4>
                <p>{new Date().toLocaleString()}</p>
              </div>
              <div className="amount-info">₹{orderData?.total?.toFixed(2)}</div>
              <div className="transaction-info">
                <p><strong>UPI</strong> | {transactionId}</p>
                <p>ⓘ Visit razorpay.com/support for queries</p>
              </div>
            </div>
            <div className="secured-by-white">Secured by <strong>Razorpay</strong></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MockPaymentGateway;