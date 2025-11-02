
import React from "react";
import { ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react";

export default function Summary({ items = [] }) {
  const income = items
    .filter((i) => i.type === "income")
    .reduce((s, i) => s + i.amount, 0);
  const expense = items
    .filter((i) => i.type === "expense")
    .reduce((s, i) => s + i.amount, 0);
  const balance = income - expense;
  const ratio = income ? Math.min(expense / income, 1) * 100 : 0;

  const format = (num) =>
    num.toLocaleString("en-IN", { minimumFractionDigits: 0 });

  return (
    <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
      <h3 className="font-semibold text-gray-800 text-lg mb-4 flex items-center gap-2">
        <Wallet className="w-5 h-5 text-indigo-600" /> Financial Summary
      </h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <span className="flex items-center gap-2 text-green-700 font-medium">
            <ArrowUpCircle className="w-4 h-4" /> Income
          </span>
          <span className="font-bold text-green-700">₹{format(income)}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
          <span className="flex items-center gap-2 text-red-700 font-medium">
            <ArrowDownCircle className="w-4 h-4" /> Expenses
          </span>
          <span className="font-bold text-red-700">₹{format(expense)}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-t-2 border-blue-100">
          <span className="text-blue-700 font-semibold">Net Balance</span>
          <span
            className={`font-bold text-lg ${
              balance >= 0 ? "text-green-700" : "text-red-700"
            }`}
          >
            {balance >= 0
              ? `₹${format(balance)}`
              : `-₹${format(Math.abs(balance))}`}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-5">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Spending Ratio</span>
          <span>{ratio.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-red-400 to-red-600 h-3 transition-all duration-700 ease-out"
            style={{ width: `${ratio}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          You've spent {ratio.toFixed(1)}% of your income
        </p>
      </div>
    </div>
  );
}