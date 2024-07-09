<template>
  <div class="categorie-list">
    <h2>Liste des Catégories d'Articles</h2>
    
    <!-- Champ de recherche -->
    <input type="text" v-model="searchQuery" placeholder="Rechercher " @input="filterCategories">
    
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="categorie in filteredCategories" :key="categorie.id">
          <td>
            <template v-if="!categorie.editing">{{ categorie.nom }}</template>
            <input v-model="categorie.nom" v-else>
          </td>
          <td>
            <template v-if="!categorie.editing">{{ categorie.description }}</template>
            <input v-model="categorie.description" v-else>
          </td>
          <td>
            <template v-if="!categorie.editing">
              <button @click="editCategorie(categorie)">Modifier</button>
              <button @click="confirmDelete(categorie)">Supprimer</button>
              <span v-if="categorie.confirmDelete">
                Confirmer ? <button @click="deleteCategorie(categorie.id)">Oui</button> <button @click="cancelDelete(categorie)">Non</button>
              </span>
            </template>
            <template v-else>
              <button @click="saveCategorie(categorie)">Enregistrer</button>
              <button @click="cancelEdit(categorie)">Annuler</button>
            </template>
          </td>
        </tr>
        <!-- Si aucun résultat ne correspond à la recherche -->
        <tr v-if="filteredCategories.length === 0 && searchQuery !== ''">
          <td colspan="3" style="text-align: center;">Aucun résultat trouvé.</td>
        </tr>
        <!-- Afficher un message si toutes les catégories sont visibles -->
        <tr v-if="!searchQuery && categories.length > 0 && filteredCategories.length === categories.length">
          <td colspan="3" style="text-align: center;">Affichage de toutes les catégories.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import CategorieService from '@/services/CategorieService';

export default {
  name: 'ListCategorie',
  data() {
    return {
      categories: [
        { id: 1, nom: 'Technologie', description: 'Articles sur les dernières technologies', editing: false, confirmDelete: false },
        { id: 2, nom: 'Santé', description: 'Conseils et informations sur la santé', editing: false, confirmDelete: false },
        { id: 3, nom: 'Voyage', description: 'Destinations et astuces de voyage', editing: false, confirmDelete: false },
      ],
      filteredCategories: [],
      searchQuery: '',
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await CategorieService.getAll();
        this.categories = response.data.map(categorie => ({
          ...categorie,
          editing: false,
          confirmDelete: false
        }));
        this.filteredCategories = [...this.categories];
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    },
    async deleteCategorie(categorieId) {
      try {
        await CategorieService.delete(categorieId);
        this.categories = this.categories.filter(categorie => categorie.id !== categorieId);
        this.filteredCategories = this.filteredCategories.filter(categorie => categorie.id !== categorieId);
      } catch (error) {
        console.error('Erreur lors de la suppression de la catégorie :', error);
      }
    },
    confirmDelete(categorie) {
      categorie.confirmDelete = true;
    },
    cancelDelete(categorie) {
      categorie.confirmDelete = false;
    },
    editCategorie(categorie) {
      categorie.editing = true;
    },
    async saveCategorie(categorie) {
      try {
        await CategorieService.update(categorie.id, categorie);
        categorie.editing = false;
        const index = this.categories.findIndex(c => c.id === categorie.id);
        if (index !== -1) {
          this.categories[index] = { ...categorie };
          this.filteredCategories = [...this.categories];
        }
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des modifications :', error);
      }
    },
    cancelEdit(categorie) {
      categorie.editing = false;
    },
    filterCategories() {
      const query = this.searchQuery.toLowerCase().trim();
      if (query === '') {
        this.filteredCategories = [...this.categories];
      } else {
        this.filteredCategories = this.categories.filter(categorie =>
          categorie.nom.toLowerCase().includes(query) ||
          categorie.description.toLowerCase().includes(query)
        );
      }
    }
  }
};
</script>

<style scoped>
.categorie-list {
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

input[type="text"]::placeholder {
  color: #888;
}

input[type="text"]:focus {
  outline: none;
  border-color: #5b9bd5;
}
</style>
