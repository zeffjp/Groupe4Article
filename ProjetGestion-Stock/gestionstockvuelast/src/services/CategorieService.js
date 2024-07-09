
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/categories';

export default {
  getAll() {
    return axios.get(API_URL);
  },

  getById(id) {
    return axios.get(`${API_URL}/${id}`);
  },

  create(categorieData) {
    return axios.post(API_URL, categorieData);
  },

  update(id, categorieData) {
    return axios.put(`${API_URL}/${id}`, categorieData);
  },

  delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
};
