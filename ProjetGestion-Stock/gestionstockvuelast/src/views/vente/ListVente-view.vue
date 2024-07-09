<template>
  <div class="vente-list">
    <h2>Liste des Ventes</h2>

    <!-- Champ de recherche -->
    <input type="text" v-model="searchQuery" placeholder="Rechercher" @input="filterVentes">

    <!-- Tableau des ventes -->
    <table>
      <thead>
        <tr>
          <th>Client</th>
          <th>Date</th>
          <th>Article Vendu</th>
          <th>Quantité Vendu</th>
          <th>Prix Total</th>
          
        </tr>
      </thead>
      <tbody>
        <!-- Affichage des ventes filtrées -->
        <tr v-for="vente in filteredVentes" :key="vente.id">
          <td>{{ vente.client }}</td>
          <td>{{ formatDate(vente.date) }}</td>
          <td>{{ vente.article }}</td>
          <td
            contenteditable
            @blur="updateVente(vente.id, 'quantite', $event.target.textContent)"
            :class="{ 'editable': vente.editMode && vente.id === editedVenteId }"
          >
            {{ vente.quantite }}
          </td>
          <td>{{ vente.prixTotal }}</td>
          <td>
            <select
              v-if="vente.editMode"
              v-model="vente.statut"
              @change="updateVente(vente.id, 'statut', $event.target.value)"
            >
              <option value="En cours">En cours</option>
              <option value="Terminée">Terminée</option>
              <option value="Annulée">Annulée</option>
            </select>
            <span v-else>{{ vente.statut }}</span>
          </td>
          <td>
            <button v-if="!vente.editMode" @click="enableEditMode(vente.id)">Modifier</button>
            <button v-else @click="saveVente(vente.id)">Sauvegarder</button>
            <button @click="deleteVente(vente.id)">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import VenteService from '@/services/VenteService';

export default {
  name: 'ListVente',
  data() {
    return {
      ventes: [],
      editedVenteId: null,
      searchQuery: '',
      filteredVentes: []
    };
  },
  methods: {
    async fetchVentes() {
      try {
        const response = await VenteService.getAll();
        this.ventes = response.data;
        this.filteredVentes = [...this.ventes];
      } catch (error) {
        console.error('Erreur lors de la récupération des ventes :', error);
      }
    },
    async deleteVente(venteId) {
      try {
        await VenteService.delete(venteId);
        this.ventes = this.ventes.filter(vente => vente.id !== venteId);
        this.filteredVentes = this.filteredVentes.filter(vente => vente.id !== venteId);
        console.log(`Vente ${venteId} supprimée.`);
      } catch (error) {
        console.error('Erreur lors de la suppression de la vente :', error);
      }
    },
    updateVente(venteId, field, value) {
      const vente = this.ventes.find(v => v.id === venteId);
      if (vente) {
        vente[field] = value;
      }
    },
    enableEditMode(venteId) {
      this.ventes.forEach(vente => {
        vente.editMode = vente.id === venteId;
      });
      this.editedVenteId = venteId;
    },
    async saveVente(venteId) {
      const editedVente = this.ventes.find(v => v.id === venteId);
      if (editedVente) {
        editedVente.editMode = false;
        this.editedVenteId = null;

        try {
          await VenteService.update(venteId, editedVente);
          console.log(`Vente ${venteId} mise à jour sur le serveur.`);
        } catch (error) {
          console.error('Erreur lors de la mise à jour de la vente sur le serveur :', error);
        }
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('fr-FR', options);
    },
    filterVentes() {
      const query = this.searchQuery.toLowerCase().trim();
      if (query === '') {
        this.filteredVentes = [...this.ventes];
      } else {
        this.filteredVentes = this.ventes.filter(vente =>
          vente.client.toLowerCase().includes(query) ||
          vente.article.toLowerCase().includes(query) ||
          vente.numero.toLowerCase().includes(query)
        );
      }
    }
  },
  created() {
    this.fetchVentes();
  }
};
</script>

<style scoped>
.vente-list {
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
