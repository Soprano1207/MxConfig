import axios from "axios"

export const fetchUserConfiguration = async () => {
  return axios.get(`http://localhost:8080/api/configurator/getUserConfiguration`).then(response => response.data);
}
export const addToConfiguration = async (data) => {
  return axios.post(`http://localhost:8080/api/configurator/addToConfiguration`, data).then(response => response.data);
}
export const removeFromConfiguration = async (data) => {
  return axios.post(`http://localhost:8080/api/configurator/removeFromConfiguration`, data).then(response => response.data);
}