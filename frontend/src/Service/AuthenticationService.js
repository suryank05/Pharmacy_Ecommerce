import axios from 'axios'

export const login=async (request) =>{
   return await axios.post('http://localhost:8083/auth/login',request)
}