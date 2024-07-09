
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/fournisseurs'; 

export default {
  getAll() {
    return axios.get(API_URL);
  },

  getById(id) {
    return axios.get(`${API_URL}/${id}`);
  },

  create(fournisseurData) {
    return axios.post(API_URL, fournisseurData);
  },

  update(id, fournisseurData) {
    return axios.put(`${API_URL}/${id}`, fournisseurData);
  },

  delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
};
