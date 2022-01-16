import Transaction from './Transaction';
import User from './User';

interface Account {
    user:User,
    balance:number,
    transactions?:Transaction[]
}

export default Account