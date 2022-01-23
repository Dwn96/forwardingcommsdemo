import axios from 'axios';
import serverBaseUrl from '../../config';
import Transaction from '../lib/Transaction';
import User from '../lib/User';

export const createTransaction = async(tx:Transaction) => {
    axios.post(`${serverBaseUrl}/transactions`, {
        senderId: tx.senderId,
        receiverId: tx.receiverId,
        amount: tx.amount,
        action: tx.action
    })
    .catch((error) => {
        console.log('Something went wrong processing your transaction',error.message)
    })
}

export const getTransactions = async(userId:number) => {
    axios.post(`${serverBaseUrl}/transactions/user/${userId}`)
    .catch((error) => {
        console.log('Something went wrong processing your transaction',error)
    })
}