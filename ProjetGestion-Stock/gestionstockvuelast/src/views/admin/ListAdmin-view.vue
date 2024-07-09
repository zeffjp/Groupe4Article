<template>
  <div class="admin-list">
    <h2>Liste des Administrateurs</h2>

    <!-- Champ de recherche -->
    <input type="text" v-model="searchQuery" placeholder="Rechercher " @input="filterAdmins">

    <!-- Tableau des administrateurs -->
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Email</th>
          <th>Téléphone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!-- Affichage des administrateurs filtrés -->
        <tr v-for="admin in filteredAdmins" :key="admin.id">
          <td>
            <template v-if="!admin.editing">{{ admin.nom }}</template>
            <input v-model="admin.nom" v-else>
          </td>
          <td>
            <template v-if="!admin.editing">{{ admin.prenom }}</template>
            <input v-model="admin.prenom" v-else>
          </td>
          <td>
            <template v-if="!admin.editing">{{ admin.email }}</template>
            <input v-model="admin.email" v-else>
          </td>
          <td>
            <template v-if="!admin.editing">{{ admin.telephone }}</template>
            <input v-model="admin.telephone" v-else>
          </td>
          <td>
            <template v-if="!admin.editing">
              <button @click="editAdmin(admin)">Modifier</button>
              <button @click="confirmDelete(admin)">Supprimer</button>
              <span v-if="admin.confirmDelete">
                Confirmer ? <button @click="deleteAdmin(admin)">Oui</button> <button @click="cancelDelete(admin)">Non</button>
              </span>
            </template>
            <template v-else>
              <button @click="saveAdmin(admin)">Enregistrer</button>
              <button @click="cancelEdit(admin)">Annuler</button>
            </template>
          </td>
        </tr>
        <!-- Si aucun résultat ne correspond à la recherche -->
        <tr v-if="filteredAdmins.length === 0 && searchQuery !== ''">
          <td colspan="5" style="text-align: center;">Aucun résultat trouvé.</td>
        </tr>
        <!-- Afficher un message si tous les administrateurs sont visibles -->
        <tr v-if="!searchQuery && admins.length > 0 && filteredAdmins.length === admins.length">
          <td colspan="5" style="text-align: center;">Affichage de tous les administrateurs.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminService from '@/services/AdminService';

export default {
  name: 'ListAdmin',
  data() {
    return {
      admins: [], 
      searchQuery: '', 
      filteredAdmins: [] 
    };
  },
  methods: {
    async fetchAdmins() {
      try {
        const response = await AdminService.getAll();
        this.admins = response.data.map(admin => ({
          ...admin,
          editing: false, 
          confirmDelete: false 
        }));
        this.filteredAdmins = [...this.admins]; //
      } catch (error) {
        console.error('Erreur lors de la récupération des administrateurs :', error);
      }
    },
    async deleteAdmin(admin) {
      const adminId = admin.id;
      try {
        await AdminService.delete(adminId);
        this.admins = this.admins.filter(a => a.id !== adminId);
        this.filteredAdmins = this.filteredAdmins.filter(a => a.id !== adminId);
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'administrateur :', error);
      }
    },
    confirmDelete(admin) {
      admin.confirmDelete = true;
    },
    cancelDelete(admin) {
      admin.confirmDelete = false;
    },
    editAdmin(admin) {
      admin.editing = true; 
    },
    async saveAdmin(admin) {
      try {
        await AdminService.update(admin.id, admin);

        admin.editing = false; 
        const index = this.admins.findIndex(a => a.id === admin.id);
        if (index !== -1) {
          this.admins[index] = { ...admin };
          this.filteredAdmins = [...this.admins];
        }
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des modifications :', error);
      }
    },
    cancelEdit(admin) {
      admin.editing = false;
    },
    filterAdmins() {
      const query = this.searchQuery.toLowerCase().trim();
      if (query === '') {
        this.filteredAdmins = [...this.admins]; 
      } else {
        this.filteredAdmins = this.admins.filter(admin =>
          admin.nom.toLowerCase().includes(query) ||
          admin.prenom.toLowerCase().includes(query) ||
          admin.email.toLowerCase().includes(query) ||
          admin.telephone.includes(query)
        );
      }
    }
  },
  created() {
    this.fetchAdmins();
  }
};
</script>

<style scoped>
.admin-list {
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
