<template>
  <div class="categorie-list">
    <h2>Liste des Catégories d'Articles</h2>

    <!-- Champ de recherche -->
    <div class="search-container">
      <input type="text" v-model="searchText" placeholder="Rechercher une catégorie..." class="form-control" />
    </div>

    <!-- Tableau des catégories -->
    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredCategories.length === 0">
            <td colspan="3" style="text-align: center;">Aucune catégorie disponible.</td>
          </tr>
          <tr v-for="categorie in filteredCategories" :key="categorie.categorieId">
            <td v-if="!categorie.editing">{{ categorie.categorieNom }}</td>
            <td v-else><input v-model="categorie.categorieNom" /></td>

            <td v-if="!categorie.editing">{{ categorie.categorieDescription }}</td>
            <td v-else><input v-model="categorie.categorieDescription" /></td>

            <td>
              <template v-if="!categorie.editing">
                <button @click="editCategorie(categorie)" class="btn btn-sm btn-primary">Modifier</button>
                <button @click="confirmDelete(categorie)" class="btn btn-sm btn-danger">Supprimer</button>
                <span v-if="categorie.confirmDelete">
                  Confirmer ?
                  <button @click="deleteCategorie(categorie)" class="btn btn-sm btn-danger">Oui</button>
                  <button @click="cancelDelete(categorie)" class="btn btn-sm btn-secondary">Non</button>
                </span>
              </template>
              <template v-else>
                <button @click="saveCategorie(categorie)" class="btn btn-sm btn-success">Enregistrer</button>
                <button @click="cancelEdit(categorie)" class="btn btn-sm btn-secondary">Annuler</button>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import CategorieService from '@/services/CategorieService';

export default {
  name: 'ListCategorie',
  data() {
    return {
      categories: [],
      searchText: ''
    };
  },
  created() {
    this.fetchCategories();
  },
  computed: {
    filteredCategories() {
      return this.categories.filter(categorie => {
        return categorie.categorieNom.toLowerCase().includes(this.searchText.toLowerCase());
      });
    }
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await CategorieService.getAllCategories();
        this.categories = response.data.map(categorie => ({
          ...categorie,
          editing: false,
          confirmDelete: false
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
        alert('Une erreur s\'est produite lors de la récupération des catégories.');
      }
    },
    async deleteCategorie(categorie) {
      const categorieId = categorie.categorieId;
      try {
        await CategorieService.deleteCategorie(categorieId);
        this.categories = this.categories.filter(c => c.categorieId !== categorieId);
      } catch (error) {
        console.error('Erreur lors de la suppression de la catégorie :', error);
        alert('Une erreur s\'est produite lors de la suppression de la catégorie.');
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
        await CategorieService.updateCategorie(categorie.categorieId, categorie);
        categorie.editing = false;
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des modifications de la catégorie :', error);
        alert('Une erreur s\'est produite lors de la sauvegarde des modifications de la catégorie.');
      }
    },
    cancelEdit(categorie) {
      categorie.editing = false;
    }
  }
};
</script>

<style scoped>
.categorie-list {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(118, 122, 122, 0.2);
  font-family: 'Orbitron', sans-serif;
  color: rgb(60, 67, 67);
}

h2 {
  color: #444;
}

.table-responsive {
  margin-top: 20px;
}

.table th {
  background-color: #b6c7d9;
  color: #fff;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.5);
}

.table td {
  color: rgb(15, 16, 16);
}

.btn {
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
}

.btn-primary {
  background-color: rgb(0, 123, 255);
  color: #fff;
}

.btn-primary:hover {
  background-color: rgb(23, 33, 33);
}

.btn-danger {
  background-color: rgb(220, 53, 69);
  color: #fff;
}

.btn-danger:hover {
  background-color: rgb(153, 0, 17);
}

.btn-success {
  background-color: rgb(40, 167, 69);
  color: #fff;
}

.btn-secondary {
  background-color: rgb(108, 117, 117);
  color: #fff;
}

.btn-secondary:hover {
  background-color: rgb(38, 39, 39);
}

.search-container {
  margin-bottom: 20px;
  text-align: right;
}
</style>
