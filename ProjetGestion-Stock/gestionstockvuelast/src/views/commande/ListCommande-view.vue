<template>
  <div class="commande-list">
    <h2>Liste des Commandes</h2>

    <!-- Champ de recherche -->
    <input type="text" v-model="searchQuery" placeholder="Rechercher" @input="filterCommandes">

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
            <template v-if="!commande.editing">
              <button @click="editCommande(commande)">Modifier</button>
              <button @click="confirmDelete(commande)">Supprimer</button>
              <span v-if="commande.confirmDelete">
                Confirmer ? <button @click="deleteCommande(commande)">Oui</button> <button @click="cancelDelete(commande)">Non</button>
              </span>
            </template>
            <template v-else>
              <button @click="saveCommande(commande)">Enregistrer</button>
              <button @click="cancelEdit(commande)">Annuler</button>
            </template>
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
      commandes: [   { id: 1, numero: 'CMD001', client: 'Client A', date: '2024-06-27', article: 'Article X', quantite: 2, prixTotal: 50.00, statut: 'En cours' },
        { id: 2, numero: 'CMD002', client: 'Client B', date: '2024-06-26', article: 'Article Y', quantite: 1, prixTotal: 30.00, statut: 'Livré' },
        { id: 3, numero: 'CMD003', client: 'Client A', date: '2024-06-25', article: 'Article Z', quantite: 3, prixTotal: 80.00, statut: 'En cours' },
        { id: 4, numero: 'CMD004', client: 'Client C', date: '2024-06-24', article: 'Article X', quantite: 1, prixTotal: 25.00, statut: 'Annulé' },
        { id: 5, numero: 'CMD005', client: 'Client B', date: '2024-06-23', article: 'Article Z', quantite: 2, prixTotal: 60.00, statut: 'Livré' }],
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
      const commandeId = commande.id;
      try {
        await CommandeService.delete(commandeId);
        this.commandes = this.commandes.filter(cmd => cmd.id !== commandeId);
        this.filteredCommandes = this.filteredCommandes.filter(cmd => cmd.id !== commandeId);
      } catch (error) {
        console.error('Erreur lors de la suppression de la commande :', error);
      }
    },
    confirmDelete(commande) {
      commande.confirmDelete = true;
    },
    cancelDelete(commande) {
      commande.confirmDelete = false;
    },
    editCommande(commande) {
      commande.editing = true;
    },
    async saveCommande(commande) {
      try {
        await CommandeService.update(commande.id, commande);
        commande.editing = false;
        const index = this.commandes.findIndex(cmd => cmd.id === commande.id);
        if (index !== -1) {
          this.commandes[index] = { ...commande };
          this.filteredCommandes = [...this.commandes];
        }
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des modifications :', error);
      }
    },
    cancelEdit(commande) {
      commande.editing = false;
    },
    filterCommandes() {
      const query = this.searchQuery.toLowerCase().trim();
      if (query === '') {
        this.filteredCommandes = [...this.commandes];
      } else {
        this.filteredCommandes = this.commandes.filter(cmd =>
          cmd.numero.toLowerCase().includes(query) ||
          cmd.client.toLowerCase().includes(query) ||
          cmd.article.toLowerCase().includes(query) ||
          cmd.statut.toLowerCase().includes(query)
        );
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('fr-FR', options);
    }
  },
  created() {
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

input[type="text"] {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}
</style>
