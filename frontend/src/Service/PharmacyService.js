import axios from 'axios'

export const addCategory=async (category) =>{
   return await axios.post('http://localhost:8083/pharmacy/create',category)
}


export const getByUser=async (userid) =>{
   return await axios.get(`http://localhost:8083/pharmacy/by-user/${userid}`)
}

export const getById=async (id) =>{
   return await axios.get(`http://localhost:8083/pharmacy/${id}`);
}

export const getAll=async ()=>{
   return await axios.get('http://localhost:8083/pharmacy/');
}