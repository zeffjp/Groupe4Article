<template>
  <div class="add-categorie">
    <h2>Ajouter une Catégorie d'Articles</h2>
    <form @submit.prevent="createCategorie" class="form-container">
      <div class="form-group">
        <input type="text" v-model="newCategorie.categorieNom" id="categorieNom" class="form-control" placeholder="Nom de la catégorie" required>
      </div>
      <div class="form-group">
        <textarea v-model="newCategorie.categorieDescription" id="categorieDescription" class="form-control" placeholder="Description de la catégorie"></textarea>
      </div>
      <button type="submit" class="btn btn-primary w-100">Ajouter</button>
    </form>
  </div>
</template>

<script>
import CategorieService from '@/services/CategorieService';

export default {
  name: 'AddCategorie',
  data() {
    return {
      newCategorie: {
        categorieNom: '',
        categorieDescription: ''
      }
    };
  },
  methods: {
    async createCategorie() {
      try {
        const response = await CategorieService.createCategorie(this.newCategorie);
        console.log('Nouvelle catégorie ajoutée :', response.data);
        alert('Catégorie ajoutée avec succès!');
        this.$router.push({ name: 'ListArticle', params: { newArticle: response.data } });
        this.resetForm();
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la catégorie :', error);
        alert('Erreur lors de l\'ajout de la catégorie. Veuillez réessayer.');
      }
    },
    resetForm() {
      this.newCategorie = {
        categorieNom: '',
        categorieDescription: ''
      };
    }
  }
};
</script>

<style scoped>
.add-categorie {
  width: 100%;
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  font-family: 'Orbitron', sans-serif;
  color: #333;
}

h2 {
  color: #3a4545;
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
}

input[type="text"]:focus,
textarea:focus {
  outline: none;
  border-color: #555;
}

button[type="submit"] {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
