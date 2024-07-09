<template>
  <div class="article-list">
    <h2>Liste des Articles</h2>

    <!-- Champ de recherche -->
    <input type="text" v-model="searchQuery" placeholder="Rechercher" @input="filterArticles">

    <!-- Tableau des articles -->
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Description</th>
          <th>Catégorie</th>
          <th>Prix</th>
          <th>Quantité en Stock</th>
          <th>Supprimé</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Affichage des articles filtrés -->
        <tr v-for="article in filteredArticles" :key="article.id">
          <td>
            <template v-if="!article.editing">{{ article.nom }}</template>
            <input v-model="article.nom" v-else>
          </td>
          <td>
            <template v-if="!article.editing">{{ article.description }}</template>
            <input v-model="article.description" v-else>
          </td>
          <td>
            <template v-if="!article.editing">{{ article.categorie }}</template>
            <input v-model="article.categorie" v-else>
          </td>
          <td>
            <template v-if="!article.editing">{{ article.prix }}</template>
            <input v-model.number="article.prix" v-else>
          </td>
          <td>
            <template v-if="!article.editing">{{ article.quantiteStock }}</template>
            <input v-model.number="article.quantiteStock" v-else>
          </td>
          <td>{{ article.deleted ? 'Oui' : 'Non' }}</td>
          <td>
            <template v-if="!article.editing">
              <button @click="editArticle(article)">Modifier</button>
              <button @click="confirmDelete(article)">Supprimer</button>
              <span v-if="article.confirmDelete">
                Confirmer ? <button @click="deleteArticle(article)">Oui</button> <button @click="cancelDelete(article)">Non</button>
              </span>
            </template>
            <template v-else>
              <button @click="saveArticle(article)">Enregistrer</button>
              <button @click="cancelEdit(article)">Annuler</button>
            </template>
          </td>
        </tr>
        <!-- Si aucun résultat ne correspond à la recherche -->
        <tr v-if="filteredArticles.length === 0 && searchQuery !== ''">
          <td colspan="7" style="text-align: center;">Aucun résultat trouvé.</td>
        </tr>
        <!-- Afficher un message si tous les articles sont visibles -->
        <tr v-if="!searchQuery && articles.length > 0 && filteredArticles.length === articles.length">
          <td colspan="7" style="text-align: center;">Affichage de tous les articles.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import ArticleService from '@/services/ArticleService';

export default {
  name: 'ListArticle',
  data() {
    return {
      articles: [
        { 
          id: 1, 
          nom: 'Article A', 
          description: 'Description de l\'article A', 
          categorie: 'Catégorie A', 
          prix: 29.99, 
          quantiteStock: 20,
          editing: false,
          confirmDelete: false
        },
        { 
          id: 2, 
          nom: 'Article B', 
          description: 'Description de l\'article B', 
          categorie: 'Catégorie B', 
          prix: 39.99, 
          quantiteStock: 15,
          editing: false,
          confirmDelete: false
        },
        { 
          id: 3, 
          nom: 'Article C', 
          description: 'Description de l\'article C', 
          categorie: 'Catégorie A', 
          prix: 49.99, 
          quantiteStock: 30,
          editing: false,
          confirmDelete: false
        }
      ],
      filteredArticles: [],
      searchQuery: '',
    };
  },
  methods: {
    async fetchArticles() {
      try {
        const response = await ArticleService.getAll();
        console.log('Réponse du service Articles :', response.data); // Vérifiez la structure des données
        this.articles = response.data.map(article => ({
          ...article,
          editing: false,
          confirmDelete: false
        }));
        this.filteredArticles = [...this.articles];
      } catch (error) {
        console.error('Erreur lors de la récupération des articles :', error);
      }
    },
    async deleteArticle(article) {
      const articleId = article.id;
      try {
        await ArticleService.delete(articleId);
        this.articles = this.articles.filter(a => a.id !== articleId);
        this.filteredArticles = this.filteredArticles.filter(a => a.id !== articleId);
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'article :', error);
      }
    },
    confirmDelete(article) {
      article.confirmDelete = true;
    },
    cancelDelete(article) {
      article.confirmDelete = false;
    },
    editArticle(article) {
      article.editing = true;
    },
    async saveArticle(article) {
      try {
        await ArticleService.update(article.id, article);
        article.editing = false;
        const index = this.articles.findIndex(a => a.id === article.id);
        if (index !== -1) {
          this.articles[index] = { ...article };
          this.filteredArticles = [...this.articles];
        }
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des modifications :', error);
      }
    },
    cancelEdit(article) {
      article.editing = false;
    },
    filterArticles() {
      const query = this.searchQuery.toLowerCase().trim();
      if (query === '') {
        this.filteredArticles = [...this.articles];
      } else {
        this.filteredArticles = this.articles.filter(article =>
          article.nom.toLowerCase().includes(query) ||
          article.description.toLowerCase().includes(query) ||
          article.categorie.toLowerCase().includes(query) ||
          article.prix.toString().includes(query) ||
          article.quantiteStock.toString().includes(query)
        );
      }
    }
  },
  created() {
    this.fetchArticles();
    this.filteredArticles = [...this.articles];
  }
};
</script>

<style scoped>
.article-list {
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
