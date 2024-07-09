<template>
    <div class="add-admin">
      <h2>Ajouter un Administrateur</h2>
      <form @submit.prevent="createAdmin">
        <input type="text" v-model="newAdmin.nom" placeholder="Nom" required>
        <input type="text" v-model="newAdmin.prenom" placeholder="Prénom" required>
        <input type="email" v-model="newAdmin.email" placeholder="Email" required>
        <input type="password" v-model="newAdmin.mdp" placeholder="Mot de passe" required>
        <!-- Autres champs pour l'adresse, le contact, etc., si nécessaire -->
        <button type="submit">Ajouter</button>
      </form>
    </div>
  </template>
  
  <script>
  import AdminService from '@/services/AdminService';
  
  export default {
    name: 'AddAdmin',
    data() {
      return {
        newAdmin: {
          nom: '',
          prenom: '',
          email: '',
          mdp: ''
        }
      };
    },
    methods: {
      async createAdmin() {
        try {
          const response = await AdminService.create(this.newAdmin);
          console.log('Nouvel administrateur ajouté :', response.data);
          // Réinitialisation du formulaire après ajout
          this.newAdmin = {
            nom: '',
            prenom: '',
            email: '',
            mdp: ''
          };
          // Redirection vers la liste des administrateurs après ajout
          this.$router.push('/admin/liste');
        } catch (error) {
          console.error('Erreur lors de l\'ajout de l\'administrateur :', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .add-admin {
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
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid rgb(65, 76, 76);
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
    color: rgb(103, 110, 110);
  }
  
  input[type="text"]:focus,
  input[type="email"]:focus,
  input[type="password"]:focus {
    outline: none;
    border-color: rgb(74, 74, 82);
  }
  
  button[type="submit"] {
    width: 100%;
    padding: 10px;
    background-color: rgb(68, 73, 73);
    color: #000;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s, color 0.3s;
  }
  
  button[type="submit"]:hover {
    background-color: rgb(76, 76, 84);
    color: #fff;
  }
  </style>
  