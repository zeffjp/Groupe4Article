import axios from 'axios';

const API_URL = 'http://localhost:8080/api/ventes';

const axiosConfig = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
};

const VenteService = {
  getAllVentes() {
    return axios.get(API_URL, axiosConfig);
  },

  getVenteById(id) {
    return axios.get(`${API_URL}/${id}`, axiosConfig);
  },

  createVente(venteData) {
    return axios.post(API_URL, venteData, axiosConfig);
  },

  updateVente(venteId, venteData) {
    return axios.put(`${API_URL}/${venteId}`, venteData, axiosConfig);
  },

  deleteVente(venteId) {
    return axios.delete(`${API_URL}/${venteId}`, axiosConfig);
  }
};

export default VenteService;
