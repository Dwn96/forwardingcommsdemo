import { users } from '../../database/db';
import User, { CreateUserRequest } from '../../lib/User';
import { createAccount } from './accounts';
import { v4 as uuid } from 'uuid';

/**
 * @param {Object} options
 * @param {Object} options.user user to be created
 * @throws {Error}
 * @return {Promise}
 */
 export const createUser = async (request:CreateUserRequest) => {

  if(!request.name){
    return {
      status: 400,
      data: 'Bad request. Missing required field'
    };
  }
  createUserAndAccount(request.name)
  return {
    status: 200,
    data: 'createUser ok!'
  };
};

export const createUserAndAccount = (name:string) => {
  const userId = uuid()
  const account = createAccount(userId)
  const user = {
    name: name,
    id: userId ,
    account: account
    
  }
  users.push(user)
  return user
}

