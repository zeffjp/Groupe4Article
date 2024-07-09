<template>
  <div class="add-client-container">
    <div class="form-container">
      <form @submit.prevent="addClient" class="form-style">
        <h2>Ajouter un Client</h2>
        <div class="form-group">
          <input type="text" v-model="client.name" placeholder="Nom" required>
        </div>
        <div class="form-group">
          <input type="email" v-model="client.email" placeholder="Email" required>
        </div>
        <div class="form-group">
          <input type="text" v-model="client.phone" placeholder="Téléphone" required>
        </div>
        <div class="form-group">
          <input type="text" v-model="client.address" placeholder="Adresse" required>
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddClient',
  data() {
    return {
      client: {
        name: '',
        email: '',
        phone: '',
        address: ''
      }
    };
  },
  methods: {
    addClient() {
      console.log('Client à ajouter :', this.client);
      // Logique pour ajouter le client, par exemple via une API
    }
  }
};
</script>

<style scoped>
.add-client-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 50px; /* Espace en haut pour éloigner légèrement du haut */
}

h2 {
  font-family: 'Orbitron', sans-serif;
  font-size: 24px;
  color: rgb(58, 69, 69);
  text-align: center;
  margin-top: 0; /* Supprime la marge par défaut du titre */
}

.form-container {
  width: 100%;
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #575d64;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(56, 67, 67, 0.2);
  box-sizing: border-box;
  font-family: 'Orbitron', sans-serif;
  color: #0ff;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input[type="text"],
input[type="email"],
input[type="number"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid rgb(65, 76, 76);
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.5); 
  color: rgb(103, 110, 110);
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="number"]:focus {
  outline: none;
  border-color: rgb(74, 74, 82);
}

button {
  width: 100%;
  padding: 10px;
  background-color: rgb(68, 73, 73);
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
}

button:hover {
  background-color: rgb(76, 76, 84);
  color: #fff;
}
</style>
