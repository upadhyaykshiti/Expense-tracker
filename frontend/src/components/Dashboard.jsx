
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "../features/transactions/transactionsSlice";
import TransactionForm from "./TransactionForm";
import TransactionsList from "./TransactionsList";
import Summary from "./Summary";
import Charts from "./Charts";
import { RefreshCcw } from "lucide-react";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((s) => s.transactions);
  const [filters, setFilters] = useState({});
  const [editTx, setEditTx] = useState(null);

  useEffect(() => {
    dispatch(fetchTransactions(filters));
  }, [dispatch, filters]);

  const onAdd = async (data) => {
    await dispatch(addTransaction(data)).unwrap().catch(() => {});
    dispatch(fetchTransactions(filters));
  };

  const onDelete = async (id) => {
    await dispatch(deleteTransaction(id));
  };

  const onEdit = (tx) => setEditTx(tx);

  const onUpdate = async (data) => {
    if (!editTx) return;
    await dispatch(updateTransaction({ id: editTx._id, data }))
      .unwrap()
      .catch(() => {});
    setEditTx(null);
    dispatch(fetchTransactions(filters));
  };


const handleRefresh = () => {
    setFilters({
      type: "",
      category: "",
      startDate: "",
      endDate: "",
    });
    dispatch(fetchTransactions({})); // reload full data
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredItems = items.filter((item) => {
    const { type, category, startDate, endDate } = filters;
    const date = new Date(item.date);

    return (
      (!type || item.type === type) &&
      (!category || item.category === category) &&
      (!startDate || date >= new Date(startDate)) &&
      (!endDate || date <= new Date(endDate))
    );
  });
  

  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
  //     <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-3 gap-6">
  //       {/* Left Section */}
  //       <div className="col-span-2 space-y-6">
  //         {/* Transaction Form */}
  //         <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
  //           <TransactionForm onAdd={onAdd} onUpdate={onUpdate} editTx={editTx} />
  //         </div>

  //         {/* Transactions */}
  //         <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
  //           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
  //             <h2 className="text-lg font-semibold text-gray-800 text-center sm:text-left">
  //               Transactions
  //             </h2>

  //             {/* Filter Controls */}
  //             <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2">
  //               <select
  //                 onChange={(e) =>
  //                   setFilters({ ...filters, type: e.target.value || undefined })
  //                 }
  //                 className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-indigo-400 w-[48%] sm:w-auto"
  //               >
  //                 <option value="">All</option>
  //                 <option value="income">Income</option>
  //                 <option value="expense">Expense</option>
  //               </select>

  //               <input
  //                 type="text"
  //                 placeholder="Category"
  //                 onChange={(e) =>
  //                   setFilters({
  //                     ...filters,
  //                     category: e.target.value || undefined,
  //                   })
  //                 }
  //                 className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-indigo-400 w-[48%] sm:w-auto"
  //               />

  //               <input
  //                 type="text"
  //                 onFocus={(e) => (e.target.type = "date")}
  //                 onBlur={(e) => {
  //                   if (!e.target.value) e.target.type = "text";
  //                 }}
  //                 placeholder="Start date"
  //                 onChange={(e) =>
  //                   setFilters({
  //                     ...filters,
  //                     startDate: e.target.value || undefined,
  //                   })
  //                 }
  //                 className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-indigo-400 w-[48%] sm:w-auto"
  //               />

  //               <input
  //                 type="text"
  //                 onFocus={(e) => (e.target.type = "date")}
  //                 onBlur={(e) => {
  //                   if (!e.target.value) e.target.type = "text";
  //                 }}
  //                 placeholder="End date"
  //                 onChange={(e) =>
  //                   setFilters({
  //                     ...filters,
  //                     endDate: e.target.value || undefined,
  //                   })
  //                 }
  //                 className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-indigo-400 w-[48%] sm:w-auto"
  //               />

  //               <button
  //                 onClick={() => dispatch(fetchTransactions(filters))}
  //                 className="p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow transition w-[48%] sm:w-auto"
  //                 title="Refresh"
  //               >
  //                 <RefreshCcw size={18} className="mx-auto" />
  //               </button>
  //             </div>
  //           </div>

  //           {status === "loading" ? (
  //             <div className="text-center text-gray-500 py-4">Loading...</div>
  //           ) : (
  //             <TransactionsList items={items} onDelete={onDelete} onEdit={onEdit} />
  //           )}
  //         </div>
  //       </div>

  //       {/* Right Section */}
  //       <div className="space-y-6">
  //         <Summary items={items} />
  //         <Charts items={items} />
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
    <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-3 gap-6">
      {/* Left Section */}
      <div className="col-span-2 space-y-6">
        {/* Transaction Form */}
        <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
          <TransactionForm onAdd={onAdd} onUpdate={onUpdate} editTx={editTx} />
        </div>

        {/* Transactions */}
        <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
            <h2 className="text-lg font-semibold text-gray-800 text-center sm:text-left">
              Transactions
            </h2>

            {/* Filter Controls */}
            <div className="w-full sm:w-auto flex flex-wrap justify-center sm:justify-end items-center gap-3">
              {/* Type Filter */}
              <select
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value || undefined })
                }
                className="flex-1 min-w-[45%] sm:min-w-[120px] border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>

              {/* Category Filter */}
              <input
                type="text"
                placeholder="Category"
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    category: e.target.value || undefined,
                  })
                }
                className="flex-1 min-w-[45%] sm:min-w-[120px] border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
              />

              {/* Start Date */}
              <input
                type="text"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
                placeholder="Start date"
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    startDate: e.target.value || undefined,
                  })
                }
                className="flex-1 min-w-[45%] sm:min-w-[130px] border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
              />

              {/* End Date */}
              <input
                type="text"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
                placeholder="End date"
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    endDate: e.target.value || undefined,
                  })
                }
                className="flex-1 min-w-[45%] sm:min-w-[130px] border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-400"
              />

              {/* Refresh Button */}
              <button
                // onClick={() => dispatch(fetchTransactions(filters))}
                onClick={handleRefresh}

                className="flex-1 min-w-[45%] sm:min-w-[40px] p-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow transition flex items-center justify-center"
                title="Refresh"
              >
                <RefreshCcw size={18} />
                <span className="ml-1 text-sm hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>

          {status === "loading" ? (
            <div className="text-center text-gray-500 py-4">Loading...</div>
          ) : (
            <TransactionsList items={items} onDelete={onDelete} onEdit={onEdit} />
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="space-y-6">
        <Summary items={items} />
        <Charts items={items} />
      </div>
    </div>
  </div>
);

}
