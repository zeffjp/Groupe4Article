import axios from 'axios';

const API_URL = 'http://localhost:8080/api/commandes';

const axiosConfig = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
};

const CommandeService = {
  getAllCommandes() {
    return axios.get(API_URL, axiosConfig);
  },

  getCommandeById(id) {
    return axios.get(`${API_URL}/${id}`, axiosConfig);
  },

  createCommande(commandeData) {
    return axios.post(API_URL, commandeData, axiosConfig);
  },

  deleteCommande(id, commandeData) {
    return axios.put(`${API_URL}/${id}`, commandeData, axiosConfig);
  }
};

export default CommandeService;
