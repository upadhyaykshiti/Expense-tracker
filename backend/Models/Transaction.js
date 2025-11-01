const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['income','expense'], required: true },
  amount: { type: Number, required: true, min: 0 },
  description: { type: String, trim: true, default: '' },
  category: { type: String, trim: true, required: true },
  date: { type: Date, required: true, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
