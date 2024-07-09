<template>
  <div class="add-vente">
    <h2>Ajouter une Vente</h2>
    <form @submit.prevent="create">
      <div class="form-group">
        <input type="text" v-model="newVente.client" id="client" class="form-control" placeholder="Nom du client" required>
      </div>
      <div class="form-group">
        <input type="text" v-model="newVente.articleVendu" id="article" class="form-control" placeholder="Nom de l'article" required>
      </div>
      <div class="form-group">
        <input type="date" v-model="newVente.date" id="date" class="form-control" required>
      </div>
      <div class="form-group">
        <input type="number" step="0.01" v-model.number="newVente.quantiteVendue" id="quantite" class="form-control" placeholder="Quantité Vendue" required>
      </div>
      <div class="form-group">
        <input type="number" step="0.01" v-model.number="newVente.prixTotal" id="prix" class="form-control" placeholder="Prix Total" required>
      </div>
      <button type="submit" class="btn btn-primary">Ajouter</button>
    </form>
  </div>
</template>

<script>
import VenteService from '@/services/VenteService';

export default {
  name: 'AddVente',
  data() {
    return {
      newVente: {
        client: '',
        articleVendu: '',
        date: '',
        quantiteVendue: '',
        prixTotal: ''
      }
    };
  },
  methods: {
    async create() {
      try {
        const response = await VenteService.createVente(this.newVente);
        console.log('Nouvelle vente ajoutée :', response.data);
        alert('Vente ajoutée avec succès!');
        this.$router.push({ name: 'ListVente', params: { newVente: response.data } });
        this.resetForm();
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la vente :', error);
        alert('Erreur lors de l\'ajout de la vente. Veuillez réessayer.');
      }
    },
    resetForm() {
      this.newVente = {
        client: '',
        articleVendu: '',
        date: '',
        quantiteVendue: '',
        prixTotal: ''
      };
    }
  }
};
</script>

<style scoped>
.add-vente {
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
input[type="date"],
input[type="number"] {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
}

input[type="text"]:focus,
input[type="date"]:focus,
input[type="number"]:focus {
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
