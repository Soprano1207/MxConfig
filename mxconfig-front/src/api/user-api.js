import axios from "axios"

export const authorization = async () => {
  return axios.get(`http://localhost:8080/api/user/authorization`).then(response => response.data);
}
export const signIn = async (data) => {
  return axios.post(`http://localhost:8080/api/user/signin`, data).then(response => response.data);
}
export const signUp = async (data) => {
  return axios.post(`http://localhost:8080/api/user/signup`, data).then(response => response.data);
}