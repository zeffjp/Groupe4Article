
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/ventes';

export default {
  getAll() {
    return axios.get(API_URL);
  },

  getById(id) {
    return axios.get(`${API_URL}/${id}`);
  },

  create(venteData) {
    return axios.post(API_URL, venteData);
  },

  update(id, venteData) {
    return axios.put(`${API_URL}/${id}`, venteData);
  },

  delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
};
