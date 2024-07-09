<template>
  <div class="add-categorie">
    <h2>Ajouter une Catégorie d'Articles</h2>
    <form @submit.prevent="createCategorie">
      <div class="form-group">
        <input type="text" id="nom" v-model="newCategorie.nom" placeholder="Nom" required>
      </div>
      <div class="form-group">
        <textarea id="description" v-model="newCategorie.description" placeholder="Description"></textarea>
      </div>
     
      <div class="form-group">
        <input type="number" id="Quantitearticle" v-model="newCategorie.Quantitearticle" placeholder="Quantité Article Present" required>
      </div>
      <button type="submit">Ajouter</button>
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
        nom: '',
        description: '',
        Quantitearticle: ''
      }
    };
  },
  methods: {
    async createCategorie() {
      try {
        const response = await CategorieService.create(this.newCategorie);
        console.log('Nouvelle catégorie ajoutée :', response.data);
        // Réinitialisation du formulaire après ajout
        this.newCategorie = {
          nom: '',
          description: '',
          Quantitearticle: ''
        
        };
        // Redirection vers la liste des catégories après ajout
        this.$router.push('/categorie-article/liste');
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la catégorie :', error);
      }
    }
  }
};
</script>

<style scoped>
.add-categorie {
  width: 100%;
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #575d64;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(118, 122, 122, 0.2);
  font-family: 'Orbitron', sans-serif;
  color: rgb(60, 67, 67);
}

h2 {
  color: rgb(58, 69, 69);
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

input[type="text"],
textarea,
input[type="date"],
input[type="number"] {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #3e3636;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.5);
  color: rgb(103, 110, 110);
}

input[type="text"]:focus,
textarea:focus,
input[type="date"]:focus,
input[type="number"]:focus {
  outline: none;
  border-color: rgb(74, 74, 82);
}

button {
  width: 100%;
  padding: 10px;
  background-color: rgb(68, 73, 73);
  color: #000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
}

button:hover {
  background-color: rgb(76, 76, 84);
  color: #fff;
}
</style>
