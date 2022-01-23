import express from 'express'
import users from '../api/routes/users'
import transactions from '../api/routes/transactions'
import bodyParser from 'body-parser'
import * as fs from 'fs'
import { decryptStringWithRsaPrivateKey, encryptWithClientPublicKey, generateSymmetricKey } from './crypto/crypto'
import * as crypto from 'crypto'
require('dotenv').config()

const app = express();
const port: number = parseInt(process.env.APP_PORT as string) || 1333
const host: string = process.env.APP_HOST as string

const server = require('http').createServer(app);
const io = require('socket.io')(server)
const publicKey = fs.readFileSync('./public.pem', "utf8");
const randKey = generateSymmetricKey()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
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

io.on("connection",  (socket) => {
  console.log('Begining key exchange'); 
  socket.emit('issueServerPubKey',publicKey)
  
  console.log('Issued client our public key!'); 
  socket.on('issueClientPublicKey', (key) => {    
    fs.writeFileSync('client-public.pem', key)
  })
  console.log('Recieved client public key');
  console.log('Completed key exchange')
  socket.on("disconnect", () => {
    console.log("Client disconnected");    
  })

  socket.on('userCreate', (user) => {
    console.log(user)
  })
})

server.listen(port, host, () => {
  console.info(`Server listening on http://${host}:${port}`)
})
