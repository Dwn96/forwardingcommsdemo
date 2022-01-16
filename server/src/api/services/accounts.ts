import { account, accounts } from '../../database/db'
import { v4 as uuid } from 'uuid'

export const createAccount = (userId:string) => {
    const accountId = uuid()
    accounts.push({
        userId: userId,
        accountId: accountId,
        balance: 0
    })
    return { 
        userId: userId,
        accountId: accountId,
        balance: 0
    }
}