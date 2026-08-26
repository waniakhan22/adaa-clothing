import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ordersuccess.css";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const order = location.state?.order;

  return (
    <div className="order-success-page">
      <div className="order-success-container">

        <div className="success-icon">
          ✓
        </div>

        <span className="success-label">
          ORDER CONFIRMED
        </span>

        <h1>
          Thank You For Your Order!
        </h1>

        <p className="success-message">
          Your order has been placed successfully.
          We will contact you soon regarding your delivery.
        </p>

        {order && (
          <div className="order-details">

            <div>
              <span>Order ID</span>
              <strong>{order._id}</strong>
            </div>

            <div>
              <span>Total</span>
              <strong>
                PKR {order.totalAmount.toLocaleString()}
              </strong>
            </div>

            <div>
              <span>Payment</span>
              <strong>Cash on Delivery</strong>
            </div>

            <div>
              <span>Status</span>
              <strong>
                {order.status}
              </strong>
            </div>

          </div>
        )}

        <button
          className="continue-shopping-btn"
          onClick={() => navigate("/women")}
        >
          CONTINUE SHOPPING
        </button>

      </div>
    </div>
  );
};

export default OrderSuccess;