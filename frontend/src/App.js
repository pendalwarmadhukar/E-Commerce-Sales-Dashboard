import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import SummaryCards from "./components/SummaryCards";
import MonthlySalesChart from "./components/MonthlySalesChart";
import DemographicsChart from "./components/DemographicsChart";
import TopProductsTable from "./components/TopProductsTable";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  const [overview, setOverview] = useState(null);
  const [monthlySales, setMonthlySales] = useState([]);
  const [demographics, setDemographics] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    // For now: dummy static data (later connect to backend)
    setOverview({
      totalOrders: 320,
      totalUnits: 1240,
      totalRevenue: 580000,
      totalProfit: 145000,
    });

    setMonthlySales([
      { month: "Jan", revenue: 35000 },
      { month: "Feb", revenue: 42000 },
      { month: "Mar", revenue: 50000 },
      { month: "Apr", revenue: 47000 },
      { month: "May", revenue: 52000 },
      { month: "Jun", revenue: 61000 },
      { month: "Jul", revenue: 58000 },
      { month: "Aug", revenue: 64000 },
      { month: "Sep", revenue: 60000 },
      { month: "Oct", revenue: 67000 },
      { month: "Nov", revenue: 71000 },
      { month: "Dec", revenue: 75000 },
    ]);

    setDemographics([
      { label: "North", value: 120 },
      { label: "South", value: 90 },
      { label: "East", value: 70 },
      { label: "West", value: 40 },
    ]);

    setTopProducts([
      { name: "Wireless Earbuds", unitsSold: 240, revenue: 120000 },
      { name: "Smartphone Case", unitsSold: 310, revenue: 93000 },
      { name: "Bluetooth Speaker", unitsSold: 180, revenue: 86000 },
      { name: "Laptop Stand", unitsSold: 140, revenue: 64000 },
      { name: "Smartwatch Strap", unitsSold: 190, revenue: 57000 },
    ]);
  }, []);

  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-shell">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div className="dashboard-inner">
                  {/* Header */}
                  <section className="dashboard-header">
                    <div>
                      <h1 className="dashboard-title">E-Commerce Sales Dashboard</h1>
                      <p className="dashboard-subtitle">
                        Monitor performance, understand your customers, and track growth
                        in a single view.
                      </p>
                    </div>
                    <div className="header-meta">
                      <span className="pill pill-soft">Live Demo</span>
                      <span className="pill pill-outline">Last 12 months</span>
                    </div>
                  </section>

                  {/* Summary cards */}
                  <section className="section-block">
                    {overview && <SummaryCards overview={overview} />}
                  </section>

                  {/* Charts row */}
                  <section className="section-block charts-grid">
                    <div className="panel panel-primary">
                      <div className="panel-header">
                        <div>
                          <h2 className="panel-title">Monthly Sales Trend</h2>
                          <p className="panel-subtitle">
                            Total revenue generated per month (₹).
                          </p>
                        </div>
                      </div>
                      <MonthlySalesChart data={monthlySales} />
                    </div>

                    <div className="panel">
                      <div className="panel-header">
                        <div>
                          <h2 className="panel-title">Customer Demographics</h2>
                          <p className="panel-subtitle">
                            Distribution of customers across regions.
                          </p>
                        </div>
                      </div>
                      <DemographicsChart data={demographics} />
                    </div>
                  </section>

                  {/* Table */}
                  <section className="section-block">
                    <div className="panel">
                      <div className="panel-header">
                        <div>
                          <h2 className="panel-title">Top-Selling Products</h2>
                          <p className="panel-subtitle">
                            Ranked by revenue and units sold.
                          </p>
                        </div>
                      </div>
                      <TopProductsTable data={topProducts} />
                    </div>
                  </section>
                </div>
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
