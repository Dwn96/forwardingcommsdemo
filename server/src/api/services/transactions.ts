import { transactions, users } from '../../database/db';
import Transaction from '../../lib/Transaction';
import User from '../../lib/User';
import { decryptStringWithRsaPrivateKey, encryptStringWithRsaPublicKey } from '../crypto/crypto';

/**
 * @param {Object} options
 * @param {Object} options.tx transaction to be created
 * @throws {Error}
 * @return {Promise}
 */
 export const createTransaction = (options:Transaction) => {
  
  if(!options.action || !options.amount || !options.receiverId || !options.senderId){
    return {
      status: 400,
      data: 'Bad request. Missing required field'
    };
  }
  if(!validTransaction(options)){
    return {
      status: 400,
      data: 'Bad request. Invalid transaction'
    };
  }
  transactions.push(options)
  return {
    status: 200,
    data: 'Acknowledged'
  };
};

/**
 * @param {Object} options
 * @param {Number} options.userId userId to retrieve transactions for
 * @throws {Error}
 * @return {Promise}
 */
export const getTransactionsByUserid = (options) => {
 const txs = transactions.filter((transaction => transaction.senderId == options.userId || transaction.receiverId == options.userId))
  
 if(txs.length === 0) {
    return {
      status: 400,
      data: encryptStringWithRsaPublicKey(`No transactions by user ${options.userId} found`)
    };
  }
  return {
    status: 200,
    data: encryptStringWithRsaPublicKey(JSON.stringify(txs))
  };
};
 
const validTransaction = (options:Transaction) => {
  const sender = users.find((user:any) => user.id === options.senderId) //verify sender exists
  const receiver = users.find((user:any) => user.id === options.receiverId) // verify receipient exists
  const hasEnoughBalance = (sender?.account.balance || 0 - options.amount) > 0  //check if sender has enough money for the transaction
  

  return sender && receiver && hasEnoughBalance 
}
