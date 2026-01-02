import axios from "axios";

export const registerUser = async (user) => {
  return await axios.post("http://localhost:8083/auth/register-user", user);
};

export const registerPharmacy = async (user) => {
  return await axios.post("http://localhost:8083/auth/register-pharmacy", user);
};

export const getUser = async (username) => {
  return await axios.get(`http://localhost:8083/auth/get/${username}`);
};
