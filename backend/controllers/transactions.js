const Transaction = require('../models/Transaction');

exports.createTransaction = async (req, res, next) => {
  try {
    const { type, amount, description, category, date } = req.body;
    const tx = new Transaction({ type, amount, description, category, date });
    await tx.save();
    res.status(201).json(tx);
  } catch (err) {
    next(err);
  }
};

exports.getTransactions = async (req, res, next) => {
  try {
    const { type, category, startDate, endDate, page=1, limit=100 } = req.query;
    const q = {};
    if (type) q.type = type;
    if (category) q.category = category;
    if (startDate || endDate) {
      q.date = {};
      if (startDate) q.date.$gte = new Date(startDate);
      if (endDate) q.date.$lte = new Date(endDate);
    }
    const skip = (Math.max(1, parseInt(page)) - 1) * parseInt(limit);
    const docs = await Transaction.find(q).sort({ date: -1 }).skip(skip).limit(parseInt(limit));
    const total = await Transaction.countDocuments(q);
    res.json({ data: docs, total });
  } catch (err) {
    next(err);
  }
};

exports.getTransaction = async (req, res, next) => {
  try {
    const tx = await Transaction.findById(req.params.id);
    if (!tx) return res.status(404).json({ error: 'Not found' });
    res.json(tx);
  } catch (err) {
    next(err);
  }
};

exports.updateTransaction = async (req, res, next) => {
  try {
    const tx = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tx) return res.status(404).json({ error: 'Not found' });
    res.json(tx);
  } catch (err) {
    next(err);
  }
};

exports.deleteTransaction = async (req, res, next) => {
  try {
    const tx = await Transaction.findByIdAndDelete(req.params.id);
    if (!tx) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
