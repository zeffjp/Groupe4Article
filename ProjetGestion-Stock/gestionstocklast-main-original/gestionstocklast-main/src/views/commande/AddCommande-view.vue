<template>
  <div class="add-commande">
    <h2>Ajouter une Commande</h2>
    <form @submit.prevent="createCommande">
      <div class="form-group">
        <input type="text" v-model="newCommande.client.nom" class="form-control" placeholder="Client" required>
      </div>
      <div class="form-group">
        <input type="date" v-model="newCommande.commandeDate" class="form-control" placeholder="Date de commande" required>
      </div>
      <div class="form-group">
        <select v-model="newCommande.article.nom" class="form-control" required>
          <option disabled value="">Article A</option>
          <option v-for="article in articles" :key="article.id" :value="article.nom">{{ article.nom }}</option>
        </select>
      </div>
      <div class="form-group">
        <input type="number" v-model="newCommande.commandeQuantite" class="form-control" placeholder="Quantité Commande" required>
      </div>
      <div class="form-group">
        <input type="number" v-model="newCommande.commandePrixtotal" class="form-control" placeholder="Prix total" required>
      </div>
      <div class="form-group">
        <select v-model="newCommande.commandeStatut" class="form-control" required>
          <option disabled value="">Sélectionner un statut</option>
          <option value="EN_ATTENTE">En attente</option>
          <option value="CONFIRMEE">Confirmée</option>
          <option value="EXPEDIEE">Expédiée</option>
          <option value="LIVREE">Livrée</option>
          <option value="ANNULEE">Annulée</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Ajouter</button>
    </form>
  </div>
</template>


<script>
import CommandeService from '@/services/CommandeService';
import ArticleService from '@/services/ArticleService';

export default {
  name: 'AddCommande',
  data() {
    return {
      newCommande: {
        client: { nom: '' },
        commandeDate: '',
        article: { nom: '' },
        commandeQuantite: '',
        commandePrixtotal: '',
        commandeStatut: ''
      },
      articles: []
    };
  },
  created() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      try {
        const response = await ArticleService.getAllArticles();
        this.articles = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des articles :', error);
      }
    },
    async createCommande() {
      try {
        const response = await CommandeService.createCommande(this.newCommande);
        console.log('Nouvelle commande ajoutée :', response.data);
        this.newCommande = {
          client: { nom: '' },
          commandeDate: '',
          article: { nom: '' },
          commandeQuantite: '',
          commandePrixtotal: '',
          commandeStatut: ''
        };
        this.$router.push({ name: 'ListCommande', params: { commandeId: response.data.commandeId } });
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
  margin-bottom: 10px;
}

input[type="text"],
input[type="date"],
input[type="number"],
select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
}

input[type="text"]:focus,
input[type="date"]:focus,
input[type="number"]:focus,
select:focus {
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
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}
</style>
