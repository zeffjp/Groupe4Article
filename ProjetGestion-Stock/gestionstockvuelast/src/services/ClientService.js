
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/clients'; 
export default {
  getAll() {
    return axios.get(API_URL);
  },

  getById(id) {
    return axios.get(`${API_URL}/${id}`);
  },

  create(clientData) {
    return axios.post(API_URL, clientData);
  },

  update(id, clientData) {
    return axios.put(`${API_URL}/${id}`, clientData);
  },

  delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
};
