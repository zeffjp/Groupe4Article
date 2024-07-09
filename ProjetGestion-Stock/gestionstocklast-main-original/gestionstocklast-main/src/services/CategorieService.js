import axios from 'axios';

const API_URL = 'http://localhost:8080/api/categories';
const axiosConfig = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
};

const CategorieService = {
  getAllCategories() {
    return axios.get(API_URL, axiosConfig);
  },

  getCategorieById(id) {
    return axios.get(`${API_URL}/${id}`, axiosConfig);
  },

  createCategorie(categorieData) {
    return axios.post(API_URL, categorieData, axiosConfig);
  },

  updateCategorie(id, categorieData) {
    return axios.put(`${API_URL}/${id}`, categorieData, axiosConfig);
  },

  deleteCategorie(id) {
    return axios.delete(`${API_URL}/${id}`, axiosConfig);
  }
};

export default CategorieService;
