import Account from './Account';
import Transaction from './Transaction';

interface User {
        name:string,
        id:string,
        account:Account   
        transactions?:Transaction[],
         
}
export interface CreateUserRequest {
        name:string
}

export default User