
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Cart
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("https://adaa-clothing-production.up.railway.app/api/cart", {
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
      console.error("Cart error:", error);
    } finally {
      setLoading(false);
    }
  };


  // Update Quantity
 const updateQuantity = async (itemId, quantity) => {
  console.log("UPDATE:", itemId, quantity);

  if (quantity < 1) {
    console.log("Quantity cannot go below 1");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const response = await fetch(
      `https://adaa-clothing-production.up.railway.app/api/cart/${itemId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quantity: quantity,
        }),
      }
    );

    console.log("STATUS:", response.status);

    const data = await response.json();

    console.log("RESPONSE:", data);

    if (response.ok && data.success) {
      setCart(data.cart);
    } else {
      alert(data.message || "Quantity update failed");
    }
  } catch (error) {
    console.error("UPDATE ERROR:", error);
  }
};

  // Remove Item
  const removeItem = async (itemId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://adaa-clothing-production.up.railway.app/api/cart/${itemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setCart(data.cart);
      } else {
        alert(data.message || "Failed to remove item");
      }
    } catch (error) {
      console.error("Remove item error:", error);
      alert("Unable to remove item");
    }
  };

  // Clear Basket
  const clearCart = async () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear your basket?"
    );

    if (!confirmClear) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://adaa-clothing-production.up.railway.app/api/cart", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setCart({
          items: [],
          total: 0,
        });
      } else {
        alert(data.message || "Failed to clear basket");
      }
    } catch (error) {
      console.error("Clear cart error:", error);
      alert("Unable to clear basket");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="cart-message">
        Loading basket...
      </div>
    );
  }

  // Empty Basket
  if (!cart || cart.items.length === 0) {
    return (
      <div className="empty-cart">
        <h1>Your Basket</h1>

        <p>Your basket is currently empty.</p>

        <button onClick={() => navigate("/women")}>
          CONTINUE SHOPPING
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">

        {/* Header */}
        <div className="cart-header">
          <span>MY BASKET</span>

          <h1>Your Basket</h1>

          <p>
            {cart.items.length} item(s)
          </p>
        </div>

        {/* Clear Basket */}
        <div className="clear-cart-wrapper">
          <button
            className="clear-cart-btn"
            onClick={clearCart}
          >
            CLEAR BASKET
          </button>
        </div>

        {/* Cart Items */}
        <div className="cart-items">

          {cart.items.map((item) => (

            <div
              className="cart-item"
              key={item._id}
            >

              {/* Product Image */}
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />

              {/* Product Info */}
              <div className="cart-item-info">

                <h2>
                  {item.name}
                </h2>

                <p>
                  PKR {item.price.toLocaleString()}
                </p>

                {/* Quantity */}
                <div className="quantity">

                  <button
  type="button"
  onClick={() => {
    console.log("MINUS CLICK");
    updateQuantity(item._id, item.quantity - 1);
  }}
>
  −
</button>
                  <span>
                    {item.quantity}
                  </span>

                  <button
  type="button"
  onClick={() => {
    console.log("PLUS CLICK");
    updateQuantity(item._id, item.quantity + 1);
  }}
>
  +
</button>

                </div>

              </div>

              {/* Item Total */}
              <div className="cart-item-total">

                PKR{" "}
                {(
                  item.price * item.quantity
                ).toLocaleString()}

              </div>

              {/* Remove */}
              <button
                className="remove-item-btn"
                onClick={() =>
                  removeItem(item._id)
                }
              >
                REMOVE
              </button>

            </div>

          ))}

        </div>

        {/* Summary */}
        <div className="cart-summary">

          <div>
            <span>
              Subtotal
            </span>

            <strong>
              PKR {cart.total.toLocaleString()}
            </strong>
          </div>

<button
  className="checkout-btn"
  onClick={() => navigate("/checkout")}
>
  CHECKOUT
</button>
        </div>

      </div>
    </div>
  );
};

export default Cart;
