import axios from 'axios';

const API_URL = 'http://localhost:8080/api/articles';

const axiosConfig = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
};

const ArticleService = {
  getAllArticles() {
    return axios.get(API_URL, axiosConfig);
  },

  getArticleById(id) {
    return axios.get(`${API_URL}/${id}`, axiosConfig);
  },

  createArticle(articleData) {
    return axios.post(API_URL, articleData, axiosConfig);
  },

  updateArticle(id, articleData) {
    return axios.put(`${API_URL}/${id}`, articleData, axiosConfig);
  },

  deleteArticle(id) {
    return axios.delete(`${API_URL}/${id}`, axiosConfig);
  }
};

export default ArticleService;
