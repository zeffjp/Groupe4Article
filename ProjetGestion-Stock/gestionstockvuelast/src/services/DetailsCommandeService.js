
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/details-commandes'; 

export default {
  getAll() {
    return axios.get(API_URL);
  },

  getById(id) {
    return axios.get(`${API_URL}/${id}`);
  },

  create(detailCommandeData) {
    return axios.post(API_URL, detailCommandeData);
  },

  update(id, detailCommandeData) {
    return axios.put(`${API_URL}/${id}`, detailCommandeData);
  },

  delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
};
