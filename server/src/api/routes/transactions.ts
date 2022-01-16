import express from 'express'
import Transaction from '../../lib/Transaction';
import { createTransaction, getTransactionsByUserid } from '../services/transactions';

const router = express.Router();

/**
 * create a transaction
 */
router.post('/', (req, res, next) => {
  const options = {
    senderId: req.body.source,
    receiverId: req.body.destination,
    amount: req.body.amount,
    action: req.body.action
  }

  try {
    const result = createTransaction(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId', (req, res, next) => {
  const options = {
    userId: req.params['userId']
  };

  try {
    const result = getTransactionsByUserid(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

export default router;
