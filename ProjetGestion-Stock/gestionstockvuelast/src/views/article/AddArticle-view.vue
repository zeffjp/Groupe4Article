<template>
    <div class="add-article">
      <h2>Ajouter un Article</h2>
      <form @submit.prevent="createArticle">
        <input type="text" v-model="newArticle.nom" placeholder="Nom" required>
        <textarea v-model="newArticle.description" placeholder="Description"></textarea>
        <input type="text" v-model="newArticle.categorie" placeholder="Catégorie" required>
        <input type="number" v-model="newArticle.prix" placeholder="Entrez le prix" required>
        <input type="number" v-model="newArticle.quantite" placeholder="Entrez la quantité" required>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  </template>
  
  <script>
  import ArticleService from '@/services/ArticleService';
  
  export default {
    name: 'AddArticle',
    data() {
      return {
        newArticle: {
          nom: '',
          description: '',
          categorie: '',
          prix: null, // Utilisation de null pour indiquer l'absence de valeur par défaut
          quantite: null // Utilisation de null pour indiquer l'absence de valeur par défaut
        }
      };
    },
    methods: {
      async createArticle() {
        try {
          const response = await ArticleService.create(this.newArticle);
          console.log('Nouvel article ajouté :', response.data);
          // Réinitialisation du formulaire après ajout
          this.newArticle = {
            nom: '',
            description: '',
            categorie: '',
            prix: null,
            quantite: null
          };
          // Redirection vers la liste des articles après ajout
          this.$router.push('/article/liste');
        } catch (error) {
          console.error('Erreur lors de l\'ajout de l\'article :', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Styles ajustés pour le formulaire d'ajout d'article */
  .add-article {
    width: 100%;
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background-color: #575d64;
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(56, 67, 67, 0.2);
    font-family: 'Orbitron', sans-serif;
    color: #0ff;
  }
  
  h2 {
    color: rgb(58, 69, 69);
    text-align: center; 
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  input[type="text"],
  textarea,
  input[type="number"] {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid rgb(65, 76, 76);
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5); 
    color: rgb(103, 110, 110);
  }
  
  input[type="text"]:focus,
  textarea:focus,
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
  