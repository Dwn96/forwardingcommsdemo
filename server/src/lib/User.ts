import Account from './Account';
import Transaction from './Transaction';

interface User {
        name:string,
        id:string,
        transactions?:Transaction[],
        account?:Account    
}

export default User