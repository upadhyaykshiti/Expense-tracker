

import React, { useEffect, useState } from "react";
import { PlusCircle, Edit3, Calendar, Tag, FileText, DollarSign, List } from "lucide-react";

export default function TransactionForm({ onAdd, onUpdate, editTx }) {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    type: "",
    description: "",
    date: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (editTx) setForm(editTx);
  }, [editTx]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount) return setError("Amount is required");
    if (!form.category) return setError("Category is required");
    if (!form.description) return setError("Description is required");
    if (!form.date) return setError("Date is required");

    editTx ? onUpdate(form) : onAdd(form);
    setForm({ amount: "", category: "", type: "", description: "", date: "" });
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm transition-all hover:shadow-md"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        {editTx ? (
          <>
            <Edit3 className="w-5 h-5 text-indigo-600" /> Update Transaction
          </>
        ) : (
          <>
            <PlusCircle className="w-5 h-5 text-indigo-600" /> Add Transaction
          </>
        )}
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <DollarSign className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
          />
        </div>

        <div className="relative">
          <Tag className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
          />
        </div>

        <div className="relative sm:col-span-2">
          <FileText className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
          />
        </div>

        <div className="relative">
          <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          <input
            type="date"
            value={form.date ? form.date.slice(0, 10) : ""}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
          />
        </div>

        <div className="relative">
          <List className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white transition-colors"
          >
            <option value="">Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className={`mt-5 w-full py-2.5 rounded-lg font-medium text-white transition-all duration-300 ${
          editTx
            ? "bg-indigo-600 hover:bg-indigo-700"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {editTx ? "Update Transaction" : "Add Transaction"}
      </button>
    </form>
  );
}