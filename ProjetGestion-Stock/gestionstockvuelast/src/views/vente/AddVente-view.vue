<template>
  <div class="add-vente">
    <h2>Ajouter une Vente</h2>
    <form @submit.prevent="createVente">
      <input type="text" v-model="newVente.numero" placeholder="Numéro de vente" required>
      <input type="text" v-model="newVente.client" placeholder="Client" required>
      <input type="date" v-model="newVente.date" placeholder="Date de vente" required>
      <input type="text" v-model="newVente.quantiteVendue" placeholder="Quantité Vendue (ex: 100 unités)" required>
      <input type="text" v-model="newVente.prixTotal" placeholder="Prix Total (ex: 500 EUR)" required>

      <button type="submit">Ajouter</button>
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
        numero: '',
        client: '',
        date: '',
        quantiteVendue: '',
        prixTotal: ''
      }
    };
  },
  methods: {
    async createVente() {
      try {
        const response = await VenteService.create(this.newVente);
        console.log('Nouvelle vente ajoutée :', response.data);

        // Réinitialisation du formulaire après ajout
        this.newVente = {
          numero: '',
          client: '',
          date: '',
          quantiteVendue: '',
          prixTotal: ''
        };

        // Redirection vers la liste des ventes après ajout
        this.$router.push('/vente/liste');
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la vente :', error);
      }
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
  background-color: #575d64;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(118, 122, 122, 0.2);
  font-family: 'Orbitron', sans-serif;
  color: rgb(60, 67, 67);
}

h2 {
  color: #f0e3e3;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

input[type="text"],
input[type="date"],
input[type="number"],
select {
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.5);
  color: rgb(103, 110, 110);
}

input[type="text"]:focus,
input[type="date"]:focus,
input[type="number"]:focus,
select:focus {
  outline: none;
  border-color: rgb(74, 74, 82);
}

button {
  align-self: flex-end;
  padding: 10px 280px;
  background-color:rgb(68, 73, 73);
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
}

button:hover {
  background-color: rgb(116, 116, 135);
  color: #fff;
}
</style>
