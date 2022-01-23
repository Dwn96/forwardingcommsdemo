import Transaction from './Transaction';
import User from './User';

interface Account {
    userId:string,
    accountId:string,
    balance:number,
    transactions?:Transaction[]
}

export default Account