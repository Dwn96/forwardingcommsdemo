import axios from 'axios';
import serverBaseUrl from '../../config';
import User from '../lib/User';

export const createUser = async(cipher:string) => {
    axios.post(`${serverBaseUrl}/users`, {
        name: cipher
    })
}
