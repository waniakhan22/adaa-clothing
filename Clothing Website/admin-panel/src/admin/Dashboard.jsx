import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";
import "./Admin.css";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await apiRequest("/api/admin/dashboard");
        setDashboard(data);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="content-header">Dashboard</h1>
        <div className="card">
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="content-header">Dashboard</h1>
        <div className="card">
          <p style={{ color: "red" }}>{error}</p>
        </div>
      </div>
    );
  }

  const {
    totalProducts,
    totalUsers,
    totalOrders,
    totalCarts,
    totalRevenue,
  } = dashboard.stats;

  return (
    <div>
      <h1 className="content-header">Dashboard</h1>

      {/* STATS */}
      <div className="dashboard-stats">

        <div className="stat-card">
          <div className="stat-number">
            {totalProducts}
          </div>
          <div className="stat-label">
            Total Products
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-number">
            {totalUsers}
          </div>
          <div className="stat-label">
            Registered Users
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-number">
            {totalOrders}
          </div>
          <div className="stat-label">
            Total Orders
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-number">
            {totalCarts}
          </div>
          <div className="stat-label">
            Active Carts
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-number">
            Rs. {totalRevenue.toLocaleString()}
          </div>
          <div className="stat-label">
            Total Revenue
          </div>
        </div>

      </div>

      {/* ORDER STATUS */}
      <div className="grid-1-2">

        <div className="card">
          <h3 style={{ marginBottom: "1rem" }}>
            Order Status
          </h3>

          <p>
            Pending: {dashboard.orderStatus.pending}
          </p>

          <p>
            Processing: {dashboard.orderStatus.processing}
          </p>

          <p>
            Shipped: {dashboard.orderStatus.shipped}
          </p>

          <p>
            Delivered: {dashboard.orderStatus.delivered}
          </p>

          <p>
            Cancelled: {dashboard.orderStatus.cancelled}
          </p>
        </div>

        {/* LOW STOCK */}
        <div className="card">
          <h3 style={{ marginBottom: "1rem" }}>
            Low Stock Products
          </h3>

          {dashboard.lowStockProducts.length === 0 ? (
            <p>No low-stock products.</p>
          ) : (
            dashboard.lowStockProducts.map((product) => (
              <div
                key={product._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <span>{product.name}</span>

                <strong>
                  {product.stock} left
                </strong>
              </div>
            ))
          )}
        </div>

      </div>

      {/* RECENT ORDERS */}
      <div className="card" style={{ marginTop: "1.5rem" }}>

        <h3 style={{ marginBottom: "1rem" }}>
          Recent Orders
        </h3>

        {dashboard.recentOrders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th align="left">Customer</th>
                  <th align="left">Amount</th>
                  <th align="left">Status</th>
                  <th align="left">Date</th>
                </tr>
              </thead>

              <tbody>
                {dashboard.recentOrders.map((order) => (
                  <tr key={order._id}>

                    <td>
                      {order.user?.name || "Unknown"}
                    </td>

                    <td>
                      Rs. {order.totalAmount.toLocaleString()}
                    </td>

                    <td>
                      {order.status}
                    </td>

                    <td>
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;