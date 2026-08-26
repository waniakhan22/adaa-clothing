import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../api";
import "./checkout.css";

const Checkout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  // Fetch Cart
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(apiUrl("/cart"), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setCart(data.cart);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Checkout cart error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Input Change
  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  // Place Order
  const handlePlaceOrder = async () => {
    if (!customer.name || !customer.phone || !customer.address) {
      alert("Please fill in all the details.");
      return;
    }

    try {
      setPlacingOrder(true);

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(apiUrl("/orders"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          shippingAddress: {
            fullName: customer.name,
            phone: customer.phone,
            address: customer.address,
          },
          paymentMethod: "cod",
        }),
      });

      const data = await response.json();

      console.log("ORDER RESPONSE:", data);

      if (response.ok && data.success) {
        // Order successfully created
        navigate("/order-success", {
          state: {
            order: data.order,
          },
        });
      } else {
        alert(data.message || "Failed to place order");
      }
    } catch (error) {
      console.error("PLACE ORDER ERROR:", error);
      alert("Unable to place order. Please try again.");
    } finally {
      setPlacingOrder(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="checkout-message">
        Loading checkout...
      </div>
    );
  }

  // Empty Cart
  if (!cart || cart.items.length === 0) {
    return (
      <div className="empty-checkout">
        <h1>Your Basket is Empty</h1>

        <button onClick={() => navigate("/women")}>
          CONTINUE SHOPPING
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">

        {/* Header */}
        <div className="checkout-header">
          <span>CHECKOUT</span>

          <h1>Complete Your Order</h1>

          <p>
            Enter your details to place your order.
          </p>
        </div>

        <div className="checkout-content">

          {/* Customer Details */}
          <div className="customer-details">

            <h2>Delivery Details</h2>

            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={customer.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>

              <input
                type="tel"
                name="phone"
                placeholder="03XX XXXXXXX"
                value={customer.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Delivery Address</label>

              <textarea
                name="address"
                placeholder="Enter your complete delivery address"
                value={customer.address}
                onChange={handleChange}
                rows="4"
              />
            </div>

          </div>

          {/* Order Summary */}
          <div className="order-summary">

            <h2>Your Order</h2>

            {cart.items.map((item) => (
              <div
                className="checkout-item"
                key={item._id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="checkout-item-info">

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    Qty: {item.quantity}
                  </p>

                  <span>
                    PKR{" "}
                    {(
                      item.price * item.quantity
                    ).toLocaleString()}
                  </span>

                </div>

              </div>
            ))}

            {/* Total */}
            <div className="checkout-total">

              <span>
                Subtotal
              </span>

              <strong>
                PKR {cart.total.toLocaleString()}
              </strong>

            </div>

            {/* Payment Method */}
            <div className="payment-method">

              <h3>
                Payment Method
              </h3>

              <div className="cod-option">
                <input
                  type="radio"
                  checked
                  readOnly
                />

                <label>
                  Cash on Delivery
                </label>
              </div>

            </div>

            {/* Place Order */}
            <button
              className="place-order-btn"
              onClick={handlePlaceOrder}
              disabled={placingOrder}
            >
              {placingOrder
                ? "PLACING ORDER..."
                : "PLACE ORDER"}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Checkout;