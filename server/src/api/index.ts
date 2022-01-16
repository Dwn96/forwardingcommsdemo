import express from 'express'
import users from '../api/routes/users'
import transactions from '../api/routes/transactions'
require('dotenv').config()

const app = express();
const port: number = parseInt(process.env.APP_PORT as string) || 1333
const host: string = process.env.APP_HOST as string

/*
 * Routes
 */
app.use('/api/v1/users', users);
app.use('/api/v1/transactions', transactions);

// catch 404
app.use((req, res, next) => {
  res.status(404).send({ status: 404, error: 'Not found' });
});

// catch errors
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.error || err.message;
  res.status(status).send({ status, error: msg });
});

app.listen(port, host, () => {
  console.info(`Server listening on http://${host}:${port}`)
})
