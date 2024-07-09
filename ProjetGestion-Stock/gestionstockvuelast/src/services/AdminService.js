
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/admin'; 

export default {
  getAll() {
    return axios.get(API_URL);
  },

  getById(id) {
    return axios.get(`${API_URL}/${id}`);
  },

  create(userData) {
    return axios.post(API_URL, userData);
  },

  update(id, userData) {
    return axios.put(`${API_URL}/${id}`, userData);
  },

  delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
};
