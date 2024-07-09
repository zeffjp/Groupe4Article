<template>
  <div class="add-commande">
    <h2>Ajouter une Commande</h2>
    <form @submit.prevent="createCommande">
      <input type="text" v-model="newCommande.numero" placeholder="Numéro de commande" required>
      <input type="text" v-model="newCommande.client" placeholder="Client" required>
      <input type="date" v-model="newCommande.date" placeholder="Date de commande" required>
      <select v-model="newCommande.article" required>
        <option disabled value="">Sélectionner un article</option>
        <option v-for="article in articles" :key="article.id" :value="article.nom">{{ article.nom }}</option>
      </select>
      <input type="number" v-model="newCommande.quantite" placeholder="Quantité" required>
      <input type="number" v-model="newCommande.prixTotal" placeholder="Prix total" required>
      <select v-model="newCommande.statut" required>
        <option disabled value="">Sélectionner un statut</option>
        <option value="En cours">En cours</option>
        <option value="Livré">Livré</option>
        <option value="Annulé">Annulé</option>
      </select>
      <button type="submit">Ajouter</button>
    </form>
  </div>
</template>

<script>
import CommandeService from '@/services/CommandeService';

export default {
  name: 'AddCommande',
  data() {
    return {
      newCommande: {
        numero: '',
        client: '',
        date: '',
        article: '',
        quantite: '',
        prixTotal: '',
        statut: ''
      },
      articles: []
    };
  },
  methods: {
    async createCommande() {
      try {
        const response = await CommandeService.create(this.newCommande);
        console.log('Nouvelle commande ajoutée :', response.data);
        this.newCommande = {
          numero: '',
          client: '',
          date: '',
          article: '',
          quantite: 0,
          prixTotal: 0,
          statut: ''
        };
        this.$router.push('/commande/liste');
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la commande :', error);
      }
    }
  }
};
</script>

<style scoped>
.add-commande {
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
  color:  rgb(58, 69, 69);
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
  background-color: rgb(68, 73, 73);
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
