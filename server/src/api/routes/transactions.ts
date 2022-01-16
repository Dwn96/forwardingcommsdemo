import express from 'express'
import { createTransaction, getTransactionsByUserid } from '../services/transactions';

const router = express.Router();

/**
 * create a transaction
 */
router.post('/', async (req, res, next) => {
  const options = {
    tx: req.body['tx']
  };

  try {
    const result = await createTransaction(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

router.post('/:userId', async (req, res, next) => {
  const options = {
    userId: req.params['userId']
  };

  try {
    const result = await getTransactionsByUserid(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

export default router;
