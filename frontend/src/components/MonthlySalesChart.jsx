import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MonthlySalesChart = ({ data }) => {
  return (
    <div className="chart-shell">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} />
          <YAxis tickLine={false} />
          <Tooltip
            contentStyle={{
              fontSize: "0.8rem",
              borderRadius: 10,
              border: "1px solid #e5e7eb",
            }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#15803d"
            strokeWidth={2.2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySalesChart;
