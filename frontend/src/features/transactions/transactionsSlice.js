import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const fetchTransactions = createAsyncThunk('tx/fetch', async (params={}) => {
  const resp = await axios.get(`${API}/transactions`, { params });
  return resp.data;
});

export const addTransaction = createAsyncThunk('tx/add', async (payload) => {
  const resp = await axios.post(`${API}/transactions`, payload);
  return resp.data;
});

export const updateTransaction = createAsyncThunk('transactions/updateTransaction', async ({ id, data }) => {
  const res = await axios.put(`${API}/transactions/${id}`, data); // ✅ use API
  return res.data;
});

export const deleteTransaction = createAsyncThunk('tx/delete', async (id) => {
  await axios.delete(`${API}/transactions/${id}`);
  return id;
});

const slice = createSlice({
  name: 'transactions',
  initialState: { items: [], total:0, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder)=> {
    builder
      .addCase(fetchTransactions.pending, state => { state.status='loading' })
      .addCase(fetchTransactions.fulfilled, (state, action)=> {
        state.status='succeeded'; state.items = action.payload.data; state.total = action.payload.total;
      })
      .addCase(fetchTransactions.rejected, (state, action)=> { state.status='failed'; state.error = action.error.message })
      .addCase(addTransaction.fulfilled, (state, action)=> { state.items.unshift(action.payload); state.total += 1 })
      .addCase(deleteTransaction.fulfilled, (state, action)=> {
        state.items = state.items.filter(i=> i._id !== action.payload);
        state.total = Math.max(0, state.total - 1);   
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
      const i = state.items.findIndex(t => t._id === action.payload._id);
      if (i !== -1) state.items[i] = action.payload;
      });
      
  }
});

export default slice.reducer;
