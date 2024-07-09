<template>
  <div class="commande-list">
    <h2>Liste des Commandes</h2>

    <!-- Champ de recherche -->
    <input type="text" v-model="searchQuery" placeholder="Rechercher " class="filter-input" @input="filterCommandes">

    <!-- Tableau des commandes -->
    <table>
      <thead>
        <tr>
          <th>Numéro</th>
          <th>Client</th>
          <th>Date</th>
          <th>Article</th>
          <th>Quantité</th>
          <th>Prix Total</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="commande in filteredCommandes" :key="commande.id">
          <td>{{ commande.numero }}</td>
          <td>{{ commande.client }}</td>
          <td>{{ formatDate(commande.date) }}</td>
          <td>{{ commande.article }}</td>
          <td>{{ commande.quantite }}</td>
          <td>{{ commande.prixTotal }}</td>
          <td>{{ commande.statut }}</td>
          <td>
            <template v-if="!commande.editMode">
              <button @click="editCommande(commande)">Modifier</button>
            </template>
            <template v-else>
              <button @click="saveCommande(commande)">Enregistrer</button>
              <button @click="cancelEdit(commande)">Annuler</button>
            </template>
            <button @click="confirmDelete(commande)">Supprimer</button>
            <span v-if="commande.confirmDelete">
              Confirmer ?
              <button @click="deleteCommande(commande)">Oui</button>
              <button @click="cancelDelete(commande)">Non</button>
            </span>
          </td>
        </tr>
        <!-- Afficher un message si aucune commande ne correspond à la recherche -->
        <tr v-if="filteredCommandes.length === 0 && searchQuery !== ''">
          <td colspan="8" style="text-align: center;">Aucune commande trouvée.</td>
        </tr>
        <!-- Afficher un message si toutes les commandes sont visibles -->
        <tr v-if="!searchQuery && commandes.length > 0 && filteredCommandes.length === commandes.length">
          <td colspan="8" style="text-align: center;">Affichage de toutes les commandes.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import CommandeService from '@/services/CommandeService';

export default {
  name: 'ListCommande',
  data() {
    return {
      commandes: [
        { id: 1, numero: 'CMD001', client: 'Client A', date: '2024-06-27T10:30:00Z', article: 'Article X', quantite: 3, prixTotal: 150, statut: 'En cours', editMode: false, confirmDelete: false },
        { id: 2, numero: 'CMD002', client: 'Client B', date: '2024-06-26T15:45:00Z', article: 'Article Y', quantite: 1, prixTotal: 50, statut: 'Livré', editMode: false, confirmDelete: false },
        { id: 3, numero: 'CMD003', client: 'Client C', date: '2024-06-25T09:00:00Z', article: 'Article Z', quantite: 2, prixTotal: 100, statut: 'En attente', editMode: false, confirmDelete: false }
      ],
      filteredCommandes: [],
      searchQuery: ''
    };
  },
  methods: {
    async fetchCommandes() {
      try {
        const response = await CommandeService.getAll();
        this.commandes = response.data;
        this.filteredCommandes = [...this.commandes]; // Initialisation du filtre
      } catch (error) {
        console.error('Erreur lors de la récupération des commandes :', error);
      }
    },
    async deleteCommande(commande) {
      try {
        await CommandeService.delete(commande.id);
        this.commandes = this.commandes.filter(c => c.id !== commande.id);
        this.filteredCommandes = this.filteredCommandes.filter(c => c.id !== commande.id);
        console.log(`Commande ${commande.numero} supprimée.`);
        commande.confirmDelete = false; // Cacher la confirmation après suppression
      } catch (error) {
        console.error('Erreur lors de la suppression de la commande :', error);
      }
    },
    editCommande(commande) {
      // Désactiver le mode édition pour tous les autres commandes
      this.commandes.forEach(c => c.editMode = false);
      commande.editMode = true;
    },
    async saveCommande(commande) {
      try {
        await CommandeService.update(commande.id, commande);
        commande.editMode = false;
        const index = this.commandes.findIndex(c => c.id === commande.id);
        if (index !== -1) {
          this.commandes[index] = { ...commande };
          this.filteredCommandes = [...this.commandes];
        }
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des modifications :', error);
      }
    },
    cancelEdit(commande) {
      commande.editMode = false;
    },
    filterCommandes() {
      const query = this.searchQuery.toLowerCase().trim();
      if (query === '') {
        this.filteredCommandes = [...this.commandes];
      } else {
        this.filteredCommandes = this.commandes.filter(commande =>
          commande.numero.toLowerCase().includes(query) ||
          commande.client.toLowerCase().includes(query) ||
          commande.article.toLowerCase().includes(query) ||
          commande.statut.toLowerCase().includes(query)
        );
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('fr-FR', options);
    },
    confirmDelete(commande) {
      // Afficher la confirmation de suppression pour la commande spécifiée
      commande.confirmDelete = true;
    },
    cancelDelete(commande) {
      // Annuler la confirmation de suppression pour la commande spécifiée
      commande.confirmDelete = false;
    }
  },
  mounted() {
    this.fetchCommandes();
  }
};
</script>

<style scoped>
.commande-list {
  background-color: #757c83;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(118, 122, 122, 0.2);
  font-family: 'Orbitron', sans-serif;
  color: rgb(60, 67, 67);
}

h2 {
  color: #f0e3e3;
}

.filter-input {
  margin-bottom: 20px;
  padding: 10px;
  width: 50%;
  border: 1px solid #ccc;
  border-radius: 15px;
  font-family: 'Orbitron', sans-serif;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 8px;
  text-align: left;
}

th {
  background-color: #b6c7d9;
  color: #fff;
}

tr:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.5);
}

td {
  color: rgb(15, 16, 16);
}

button {
  padding: 5px 10px;
  background-color: rgb(153, 171, 171);
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
