import axios from "axios"

export const fetchComponents = async (componentType, filter = "") => {
  return axios.get(`http://localhost:8080/api/components/${componentType}${filter}`).then(response => response.data);;
}
export const fetchFilterComponents = async (componentType) => {
  return axios.get(`http://localhost:8080/api/filter/filter_${componentType}`).then(response => response.data);;
}
export const fetchConfigurationComponents = async (componentType, filter) => {
  return axios.get(`http://localhost:8080/api/configurator/${componentType}${filter}`).then(response => response.data);;
}
