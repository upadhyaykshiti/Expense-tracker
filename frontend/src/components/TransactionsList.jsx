
import React, { useState } from "react";
import { Pencil, Trash2, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

export default function TransactionsList({ items = [], onDelete, onEdit }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedId) onDelete(selectedId);
    setShowModal(false);
    setSelectedId(null);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  if (!items.length)
    return (
      <div className="text-center text-gray-500 p-4 border rounded-lg bg-gray-50">
        No transactions yet
      </div>
    );

  return (
    <>
      <div className="space-y-3">
        {items.map((i) => {
          const isIncome = i.type === "income";
          return (
            <div
              key={i._id}
              className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white border border-gray-200 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-all ${
                isIncome ? "sm:border-green-200" : "sm:border-red-200"
              }`}
            >
              {/* Left side - icon + details */}
              <div className="flex items-start gap-3 w-full sm:w-auto">
                {/* Icon */}
                <div
                  className={`p-2 rounded-full flex items-center justify-center shrink-0 ${
                    isIncome ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {isIncome ? (
                    <ArrowUpCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <ArrowDownCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>

                {/* Transaction Details */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="font-semibold text-gray-800 truncate max-w-[120px] sm:max-w-none">
                      {i.category}
                    </span>
                    <span
                      className={`text-[11px] px-2 py-[2px] rounded-full ${
                        isIncome
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {i.type}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 truncate max-w-[160px] sm:max-w-none">
                    {i.description}
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(i.date).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Right side - amount + buttons */}
              <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto">
                <div
                  className={`font-bold text-base sm:text-lg ${
                    isIncome ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ₹{i.amount}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit && onEdit(i)}
                    className="p-2 border border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 transition-all"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(i._id)}
                    className="p-2 border border-red-200 rounded-lg text-red-600 hover:bg-red-50 transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg w-[90%] sm:w-96 text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this transaction?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
