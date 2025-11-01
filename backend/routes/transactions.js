const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const ctrl = require('../controllers/transactions');

const validate = [
  body('type').isIn(['income','expense']).withMessage('type must be income or expense'),
  body('amount').isNumeric().withMessage('amount must be a number'),
  body('category').isString().notEmpty().withMessage('category is required'),
  body('date').optional().isISO8601().toDate().withMessage('invalid date'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

router.post('/', validate, ctrl.createTransaction);
router.get('/', ctrl.getTransactions);
router.get('/:id', ctrl.getTransaction);
router.put('/:id', validate, ctrl.updateTransaction);
router.delete('/:id', ctrl.deleteTransaction);

module.exports = router;
