
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/commandes'; 

export default {
  getAll() {
    return axios.get(API_URL);
  },

  getById(id) {
    return axios.get(`${API_URL}/${id}`);
  },

  create(commandeData) {
    return axios.post(API_URL, commandeData);
  },

  update(id, commandeData) {
    return axios.put(`${API_URL}/${id}`, commandeData);
  },

  delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
};
