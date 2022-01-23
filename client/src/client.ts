import { io } from "socket.io-client";
import { encryptWithServerPublicKey, generateKeyPair } from "./crypto/crpyto";
import * as fs from "fs";
import * as http from 'http'
import { createUser } from './users/users';
import { createTransaction } from './transactions/transactions';
import Transaction from './lib/Transaction';
import Action from './lib/Action'

const socket = io("http://localhost:1338");
const publicKey = fs.readFileSync("./public.pem", "utf8");


socket.on("connect", async () => {
  console.log("Beginning key exchange");
  generateKeyPair().catch((error) => {
    console.log(error);
  });
  console.log(socket.connected);
});

socket.on('issueServerPubKey',(serverPublicKey)=>{
  console.log('Received server public key!');
  fs.writeFileSync('server-public.pem', serverPublicKey)

  socket.emit('issueClientPublicKey',publicKey)
  console.log('Issued server our public key!'); 
    console.log('Completed key exchange')  
})

// Demo send encrypted user and  transactions payloads with a http post

createUser(encryptWithServerPublicKey('John R')).catch((error) => {
  console.log(error)
})

const sampleEncryptedTx = {
  senderId: encryptWithServerPublicKey('1'),
  receiverId: encryptWithServerPublicKey('2'),
  amount: encryptWithServerPublicKey('100'),
  action: encryptWithServerPublicKey(Action.CREDIT)
} as unknown as Transaction
console.log(sampleEncryptedTx)
createTransaction(sampleEncryptedTx).catch((error) => {
  console.log(error.message)
})
