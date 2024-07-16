import axios from "axios"

export const addToConfiguration = async (data) => {
  return axios.post(`http://localhost:8080/api/configurator/add`, data).then(response => response.data);
}
export const removeFromConfiguration = async (data) => {
  return axios.post(`http://localhost:8080/api/configurator/remove`, data).then(response => response.data);
}