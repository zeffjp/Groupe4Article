import axios from 'axios';

const API_URL = 'http://localhost:8080/api/clients';

const axiosConfig = {
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true 
};

const ClientService = {
  getAllClients() {
    return axios.get(API_URL, axiosConfig);
  },

  getClientById(id) {
    return axios.get(`${API_URL}/${id}`, axiosConfig);
  },

  createClient(clientData) {
    return axios.post(API_URL, clientData, axiosConfig);
  },

  updateClient(id, clientData) {
    return axios.put(`${API_URL}/${id}`, clientData, axiosConfig);
  },

  deleteClient(id) {
    return axios.delete(`${API_URL}/${id}`, axiosConfig);
  }
};

export default ClientService;
