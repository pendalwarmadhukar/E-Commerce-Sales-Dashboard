import React from "react";

const formatCurrency = (value) => {
  return "₹" + value.toLocaleString("en-IN");
};

const SummaryCards = ({ overview }) => {
  const cards = [
    {
      key: "orders",
      label: "Total Orders",
      value: overview.totalOrders,
      subtitle: "Completed orders",
      trend: "+12.4%",
      trendLabel: "vs last month",
    },
    {
      key: "units",
      label: "Units Sold",
      value: overview.totalUnits,
      subtitle: "Total items sold",
      trend: "+8.9%",
      trendLabel: "vs last month",
    },
    {
      key: "revenue",
      label: "Total Revenue",
      value: formatCurrency(overview.totalRevenue),
      subtitle: "Gross sales",
      trend: "+15.2%",
      trendLabel: "vs last month",
    },
    {
      key: "profit",
      label: "Total Profit",
      value: formatCurrency(overview.totalProfit),
      subtitle: "Estimated net profit",
      trend: "+6.1%",
      trendLabel: "vs last month",
    },
  ];

  return (
    <div className="metrics-grid">
      {cards.map((card) => (
        <div className="metric-card" key={card.key}>
          <div className="metric-header">
            <p className="metric-label">{card.label}</p>
          </div>
          <p className="metric-value">{card.value}</p>
          <p className="metric-subtitle">{card.subtitle}</p>
          <div className="metric-trend">
            <span className="metric-trend-value">▲ {card.trend}</span>
            <span className="metric-trend-label">{card.trendLabel}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
