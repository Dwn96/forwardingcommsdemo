import express from 'express'
import { createUser } from '../services/users';
import { v4 as uuid } from 'uuid';

const router = express.Router();

/**
 * create a user
 */
router.post('/', async (req, res, next) => {
  const options = {
    name: req.body.name,
    id: uuid()
  };

  try {
    const result = await createUser(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    next(err);
  }
});

export default router