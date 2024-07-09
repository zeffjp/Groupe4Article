<template>
  <div class="add-client">
    <h2>Ajouter un Client</h2>
    <form @submit.prevent="createClient">
      <div class="form-group">
        <input type="text" v-model="newClient.clientNom" id="nom" class="form-control" placeholder="Nom du client" required>
      </div>
      <div class="form-group">
        <input type="text" v-model="newClient.clientPrenom" id="prenom" class="form-control" placeholder="Prénom du client" required>
      </div>
      <div class="form-group">
        <input type="email" v-model="newClient.clientEmail" id="email" class="form-control" placeholder="Email du client" required>
      </div>
      <div class="form-group">
        <input type="text" v-model="newClient.clientTelephone" id="telephone" class="form-control" placeholder="Téléphone du client" required>
      </div>
      <button type="submit" class="btn btn-primary">Ajouter</button>
    </form>
  </div>
</template>

<script>
import ClientService from '@/services/ClientService';

export default {
  name: 'AddClient',
  data() {
    return {
      newClient: {
        clientNom: '',
        clientPrenom: '',
        clientEmail: '',
        clientTelephone: ''
      }
    };
  },
  methods: {
    async createClient() {
      try {
        const response = await ClientService.createClient(this.newClient);
        console.log('Nouveau client ajouté :', response.data);
        alert('Client ajouté avec succès!');
        this.$router.push({ name: 'ListClient', params: { newClient: response.data } });
        this.resetForm();
      } catch (error) {
        console.error('Erreur lors de l\'ajout du client :', error);
        alert('Erreur lors de l\'ajout du client. Veuillez réessayer.');
      }
    },
    resetForm() {
      this.newClient = {
        clientNom: '',
        clientPrenom: '',
        clientEmail: '',
        clientTelephone: ''
      };
    }
  }
};
</script>

<style scoped>
.add-client {
  width: 100%;
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
  color: #333;
}

h2 {
  color: #444;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"] {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
}

input[type="text"]:focus,
input[type="email"]:focus {
  outline: none;
  border-color: #555;
}

button {
  align-self: flex-end;
  padding: 10px 50px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}
</style>
