import Action from './Action';

interface Transaction {
    senderId:number,
    receiverId:number,
    amount:number,
    action:Action
}

export default Transaction