import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  request.then((response) => {
    console.log("added person:", response.data);
  });
  return request.then((response) => response.data);
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => {
    console.log("promise fulfilled,", response.data);
    return response.data;
  });
};

const deletePerson = (id) => {
  console.log("${baseUrl}/${id}");
  const request = axios.delete(`${baseUrl}/${id}`);
  request.then((response) => {
    console.log("deleted person, ", response.data);
  });
  return request.then((response) => response.data);
};

const updatePerson = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default { create, getAll, deletePerson, updatePerson };
