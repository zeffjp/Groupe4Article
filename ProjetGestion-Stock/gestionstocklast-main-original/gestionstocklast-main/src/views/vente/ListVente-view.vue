<template>
  <div class="vente-list">
    <h2>Liste des Ventes</h2>

    <!-- Champ de recherche -->
    <div class="search">
      <input type="text" v-model="searchText" placeholder="Rechercher par client ou article..." />
    </div>

    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Client</th>
            <th>Article</th>
            <th>Date</th>
            <th>Quantité Vendue</th>
            <th>Prix Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredVentes.length === 0">
            <td colspan="6" class="no-data">Aucune vente trouvée.</td>
          </tr>
          <tr v-else v-for="vente in filteredVentes" :key="vente.id" class="vente-row">
            <td v-if="!vente.editing">{{ vente.client.nom }}</td>
            <td v-else><input v-model="vente.client.nom" /></td>

            <td v-if="!vente.editing">{{ vente.articleVendu.nom }}</td>
            <td v-else><input v-model="vente.articleVendu.nom" /></td>

            <td v-if="!vente.editing">{{ formatDate(vente.date) }}</td>
            <td v-else><input type="date" v-model="vente.date" /></td>

            <td v-if="!vente.editing">{{ vente.quantiteVendue }}</td>
            <td v-else><input type="number" v-model="vente.quantiteVendue" /></td>

            <td v-if="!vente.editing">{{ vente.prixTotal }}</td>
            <td v-else><input type="number" v-model="vente.prixTotal" /></td>

            <td>
              <template v-if="!vente.editing">
                <button class="btn btn-sm btn-primary" @click="editVente(vente)">Modifier</button>
                <button class="btn btn-sm btn-danger" @click="confirmDelete(vente)">Supprimer</button>
                <span v-if="vente.confirmDelete">
                  Confirmer ?
                  <button @click="deleteVente(vente.id)" class="btn btn-sm btn-danger">Oui</button>
                  <button @click="cancelDelete(vente)" class="btn btn-sm btn-secondary">Non</button>
                </span>
              </template>
              <template v-else>
                <button class="btn btn-sm btn-success" @click="saveVente(vente)">Enregistrer</button>
                <button class="btn btn-sm btn-secondary" @click="cancelEdit(vente)">Annuler</button>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import VenteService from '@/services/VenteService';

export default {
  name: 'ListVente',
  data() {
    return {
      ventes: [],
      searchText: ''
    };
  },
  created() {
    this.fetchVentes();
  },
  methods: {
    async fetchVentes() {
      try {
        const response = await VenteService.getAllVentes();
        this.ventes = response.data.map(vente => ({
          ...vente,
          date: new Date(vente.date)
        }));
      } catch (error) {
        console.error('Erreur lors du chargement des ventes :', error);
      }
    },
    async deleteVente(venteId) {
      try {
        await VenteService.deleteVente(venteId);
        this.ventes = this.ventes.filter(vente => vente.id !== venteId);
        alert('Vente supprimée avec succès!');
      } catch (error) {
        console.error('Erreur lors de la suppression de la vente :', error);
        alert('Erreur lors de la suppression de la vente. Veuillez réessayer.');
      }
    },
    editVente(vente) {
      vente.editing = true;
    },
    cancelEdit(vente) {
      vente.editing = false;
    },
    async saveVente(vente) {
      try {
        await VenteService.updateVente(vente.id, vente);
        vente.editing = false;
        alert('Vente mise à jour avec succès!');
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la vente :', error);
        alert('Erreur lors de la mise à jour de la vente. Veuillez réessayer.');
      }
    },
    confirmDelete(vente) {
      vente.confirmDelete = true;
    },
    cancelDelete(vente) {
      vente.confirmDelete = false;
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  },
  computed: {
    filteredVentes() {
      return this.ventes.filter(vente => {
        return (
          vente.client.nom.toLowerCase().includes(this.searchText.toLowerCase()) ||
          vente.articleVendu.nom.toLowerCase().includes(this.searchText.toLowerCase())
        );
      });
    }
  }
};
</script>

<style scoped>
.vente-list {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(118, 122, 122, 0.2);
  font-family: 'Orbitron', sans-serif;
  color: rgb(60, 67, 67);
}

h2 {
  color: #444;
  text-align: center;
}

.table-responsive {
  margin-top: 20px;
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 12px;
  text-align: center;
  border: 1px solid #ddd;
}

.table th {
  background-color: #b6c7d9;
  color: #fff;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

.no-data {
  text-align: center;
  color: #444;
}

.table td {
  color: rgb(15, 16, 16);
}

.btn {
  padding: 8px 16px;
  margin-right: 8px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  color: #fff;
}

.btn-primary {
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-danger {
  background-color: #dc3545;
}

.btn-danger:hover {
  background-color: #bd2130;
}

.btn-secondary {
  background-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
}

.btn-success {
  background-color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
}
</style>
