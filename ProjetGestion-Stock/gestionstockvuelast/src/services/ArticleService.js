
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/articles'; 

export default {
  getAll() {
    return axios.get(API_URL);
  },

  getById(id) {
    return axios.get(`${API_URL}/${id}`);
  },

  create(articleData) {
    return axios.post(API_URL, articleData);
  },

  update(id, articleData) {
    return axios.put(`${API_URL}/${id}`, articleData);
  },

  delete(id) {
    return axios.delete(`${API_URL}/${id}`);
  }
};
