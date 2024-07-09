<template>
  <div class="article-list">
    <h2>Liste des Articles</h2>

    <!-- Champ de recherche -->
    <input type="text" v-model="searchText" placeholder="Rechercher par nom, description, catégorie..." class="form-control" style="width: 100%; max-width: 400px; margin-bottom: 10px;">

    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <!-- Tableau des articles -->
        <thead>
          <tr>
            <th>Image</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Catégorie</th>
            <th>Prix</th>
            <th>Quantité en Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- Affichage des articles filtrés -->
          <tr v-if="filteredArticles.length === 0">
            <td colspan="7" class="no-data">Aucun article trouvé.</td>
          </tr>
          <tr v-else v-for="article in filteredArticles" :key="article.articleId" class="article-row">
            <td>
              <img :src="article.imageUrl || require('@/assets/placeholder.jpg')" alt="Image de l'article"
                style="max-width: 100px; max-height: 100px;">
            </td>
            <td v-if="!article.editing">{{ article.articleNom }}</td>
            <td v-else><input v-model="article.articleNom" /></td>
            
            <td v-if="!article.editing">{{ article.articleDescription }}</td>
            <td v-else><input v-model="article.articleDescription" /></td>
            
            <td v-if="!article.editing">{{ article.categorie.categorieNom }}</td>
            <td v-else><input v-model="article.categorie.categorieNom" /></td>
            
            <td v-if="!article.editing">{{ article.articlePrix }}</td>
            <td v-else><input type="number" v-model="article.articlePrix" /></td>
            
            <td v-if="!article.editing">{{ article.articleQuantite }}</td>
            <td v-else><input type="number" v-model="article.articleQuantite" /></td>
            
            <td>
              <template v-if="!article.editing">
                <button class="btn btn-sm btn-primary" @click="editArticle(article)">Modifier</button>
                <button class="btn btn-sm btn-danger" @click="confirmDelete(article)">Supprimer</button>
                <span v-if="article.confirmDelete">
                  Confirmer ?
                  <button @click="deleteArticle(article.articleId)" class="btn btn-sm btn-danger">Oui</button>
                  <button @click="cancelDelete(article)" class="btn btn-sm btn-secondary">Non</button>
                </span>
              </template>
              <template v-else>
                <button class="btn btn-sm btn-success" @click="saveArticle(article)">Enregistrer</button>
                <button class="btn btn-sm btn-secondary" @click="cancelEdit(article)">Annuler</button>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import ArticleService from '@/services/ArticleService';

export default {
  name: 'ListArticle',
  data() {
    return {
      articles: [],
      searchText: ''
    };
  },
  created() {
    this.fetchArticles();
  },
  computed: {
    filteredArticles() {
      // Filtrer les articles en fonction de this.searchText
      const searchText = this.searchText.toLowerCase().trim();
      return this.articles.filter(article =>
        article.articleNom.toLowerCase().includes(searchText) ||
        article.articleDescription.toLowerCase().includes(searchText) ||
        article.categorie.categorieNom.toLowerCase().includes(searchText)
        // Ajoutez d'autres critères de filtrage si nécessaire
      );
    }
  },
  methods: {
    async fetchArticles() {
      try {
        const response = await ArticleService.getAllArticles();
        this.articles = response.data.map(article => ({
          ...article,
          imageUrl: article.imageUrl || ''
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des articles :', error);
      }
    },
    async deleteArticle(articleId) {
      try {
        await ArticleService.deleteArticle(articleId);
        this.articles = this.articles.filter(article => article.articleId !== articleId);
        alert('Article supprimé avec succès!');
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'article :', error);
        alert('Erreur lors de la suppression de l\'article. Veuillez réessayer.');
      }
    },
    editArticle(article) {
      article.editing = true;
    },
    cancelEdit(article) {
      article.editing = false;
    },
    async saveArticle(article) {
      try {
        await ArticleService.updateArticle(article.articleId, article);
        article.editing = false;
        alert('Article mis à jour avec succès!');
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'article :', error);
        alert('Erreur lors de la mise à jour de l\'article. Veuillez réessayer.');
      }
    },
    confirmDelete(article) {
      article.confirmDelete = true;
    },
    cancelDelete(article) {
      article.confirmDelete = false;
    }
  }
};
</script>
<style scoped>
.article-list {
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
