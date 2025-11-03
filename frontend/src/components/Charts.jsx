
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Brighter color palette
const COLORS = [
  "#22c55e", // green
  "#3b82f6", // blue
  "#f97316", // orange
  "#a855f7", // purple
  "#ef4444", // red
  "#14b8a6", // teal
  "#eab308", // yellow
];

export default function Charts({ items = [] }) {
  // --- Expense by Category ---
  // const byCategory = items.reduce((acc, cur) => {
  //   acc[cur.category] =
  //     (acc[cur.category] || 0) + (cur.type === "expense" ? cur.amount : 0);
  //   return acc;
  // }, {});
  // --- Expense by Category ---
  const byCategory = items.reduce((acc, cur) => {
  acc[cur.category] = (acc[cur.category] || 0) + cur.amount;
  return acc;
  }, {});


  const pieData = Object.entries(byCategory).map(([k, v]) => ({
    name: k,
    value: v,
  }));

  // --- Daily Income vs Expense ---
  const daily = items.reduce((acc, cur) => {
    const d = new Date(cur.date).toISOString().slice(0, 10);
    if (!acc[d]) acc[d] = { date: d, income: 0, expense: 0 };
    if (cur.type === "income") acc[d].income += cur.amount;
    else acc[d].expense += cur.amount;
    return acc;
  }, {});

  const barData = Object.values(daily).slice(-10); // last 10 days

  return (
    <div className="p-6 space-y-6 transition-all duration-300 bg-white border border-gray-200 shadow-md rounded-2xl hover:shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800">Analytics</h3>

      {/* Expense by Category */}
      <div>
        <div className="mb-3 text-sm font-medium text-center text-gray-600">
          Expense by Category
        </div>

        {pieData.length > 0 ? (
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={85}
                  innerRadius={40}
                  labelLine={false}
                  isAnimationActive={true}
                >
                  {pieData.map((entry, idx) => (
                    <Cell
                      key={idx}
                      fill={COLORS[idx % COLORS.length]}
                      stroke="#fff"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [
                    `₹${value.toLocaleString("en-IN")}`,
                    "Amount",
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="py-8 text-sm text-center text-gray-400">
            No expense data yet.
          </div>
        )}
      </div>

      {/* Daily Income vs Expense */}
      <div>
        <div className="mb-3 text-sm font-medium text-center text-gray-600">
          Daily Income vs Expense
        </div>

        {barData.length > 0 ? (
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={barData}>
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11 }}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickFormatter={(value) =>
                    `₹${value.toLocaleString("en-IN")}`
                  }
                />
                <Tooltip
                  formatter={(value) => [
                    `₹${value.toLocaleString("en-IN")}`,
                    "Amount",
                  ]}
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  }
                />
                <Legend />
                <Bar
                  dataKey="income"
                  fill="url(#incomeGradient)"
                  radius={[6, 6, 0, 0]}
                  name="Income"
                />
                <Bar
                  dataKey="expense"
                  fill="url(#expenseGradient)"
                  radius={[6, 6, 0, 0]}
                  name="Expense"
                />

                {/* Gradient Definitions */}
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4ade80" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#16a34a" stopOpacity={0.8} />
                  </linearGradient>
                  <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f87171" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#dc2626" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="py-8 text-sm text-center text-gray-400">
            No transaction data yet.
          </div>
        )}
      </div>
    </div>
  );
}

