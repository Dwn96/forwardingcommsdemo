import User from '../../lib/User';

/**
 * @param {Object} options
 * @param {Object} options.user user to be created
 * @throws {Error}
 * @return {Promise}
 */
 export const createUser = async (options:User) => {

  if(!options.name || !options.id){
    return {
      status: 400,
      data: 'Bad request. Missing required field'
    };
  }
  return {
    status: 200,
    data: 'createUser ok!'
  };
};