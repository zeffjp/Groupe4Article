<template>
  <div class="dashboard">
    <nav>
      <ul class="list-unstyled">
        <li>
          <router-link to="/" class="nav-link active-link">Accueil</router-link>
        </li>
        <li>
          <button class="btn btn-link expand-btn" @click="toggleSubMenu('client')">
            <span>{{ isSubMenuExpanded('client') ? '-' : '+' }}</span> Clients
          </button>
          <ul class="sub-menu" :class="{ 'expanded': isSubMenuExpanded('client') }">
            <li><router-link to="/clients" class="nav-link active-link">Liste des Clients</router-link></li>
            <li><router-link to="/clients/add" class="nav-link active-link">Ajouter un Client</router-link></li>
          </ul>
        </li>
        <li>
          <button class="btn btn-link expand-btn" @click="toggleSubMenu('article')">
            <span>{{ isSubMenuExpanded('article') ? '-' : '+' }}</span> Articles
          </button>
          <ul class="sub-menu" :class="{ 'expanded': isSubMenuExpanded('article') }">
            <li><router-link to="/articles" class="nav-link active-link">Liste des Articles</router-link></li>
            <li><router-link to="/articles/add" class="nav-link active-link">Ajouter un Article</router-link></li>
          </ul>
        </li>
        <li>
          <button class="btn btn-link expand-btn" @click="toggleSubMenu('categorie')">
            <span>{{ isSubMenuExpanded('categorie') ? '-' : '+' }}</span> Catégories
          </button>
          <ul class="sub-menu" :class="{ 'expanded': isSubMenuExpanded('categorie') }">
            <li><router-link to="/categories" class="nav-link active-link">Liste des Catégories</router-link></li>
            <li><router-link to="/categories/add" class="nav-link active-link">Ajouter une Catégorie</router-link></li>
          </ul>
        </li>
        <li>
          <button class="btn btn-link expand-btn" @click="toggleSubMenu('commande')">
            <span>{{ isSubMenuExpanded('commande') ? '-' : '+' }}</span> Commandes
          </button>
          <ul class="sub-menu" :class="{ 'expanded': isSubMenuExpanded('commande') }">
            <li><router-link to="/commandes" class="nav-link active-link">Liste des Commandes</router-link></li>
            <li><router-link to="/commandes/add" class="nav-link active-link">Ajouter une Commande</router-link></li>
          </ul>
        </li>
        <li>
          <button class="btn btn-link expand-btn" @click="toggleSubMenu('admin')">
            <span>{{ isSubMenuExpanded('admin') ? '-' : '+' }}</span> Administrateurs
          </button>
          <ul class="sub-menu" :class="{ 'expanded': isSubMenuExpanded('admin') }">
            <li><router-link to="/admins" class="nav-link active-link">Liste des Administrateurs</router-link></li>
            <li><router-link to="/admins/add" class="nav-link active-link">Ajouter un Administrateur</router-link></li>
          </ul>
        </li>
        <li>
          <button class="btn btn-link expand-btn" @click="toggleSubMenu('vente')">
            <span>{{ isSubMenuExpanded('vente') ? '-' : '+' }}</span> Ventes
          </button>
          <ul class="sub-menu" :class="{ 'expanded': isSubMenuExpanded('vente') }">
            <li><router-link to="/ventes" class="nav-link active-link">Liste des Ventes</router-link></li>
            <li><router-link to="/ventes/add" class="nav-link active-link">Ajouter une Vente</router-link></li>
          </ul>
        </li>
        <!-- Bouton de déconnexion -->
        <li>
          <button class="btn btn-danger logout-btn" @click="logout">Déconnexion</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Dashboard',
  data() {
    return {
      expandedMenu: null
    };
  },
  methods: {
    toggleSubMenu(menuName) {
      this.expandedMenu = (this.expandedMenu === menuName) ? null : menuName;
    },
    isSubMenuExpanded(menuName) {
      return this.expandedMenu === menuName;
    },
    logout() {
      this.isAuthenticated = false; 
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.dashboard {
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0; 
  width: 220px; 
  background-color: #757c83;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto; 
  font-family: 'Orbitron', sans-serif;
  border-right: 1px solid #ccc; 
}

.expand-btn {
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: rgb(236, 244, 244); 
  text-align: left;
}

.expand-btn:hover {
  color: rgb(169, 169, 201);
}

.sub-menu {
  display: none;
  padding-left: 10px;
  transition: max-height 0.3s ease;
  max-height: 0; 
  overflow: hidden;
}

.sub-menu.expanded {
  display: block;
  max-height: 200px; 
}

.nav-link {
  display: block;
  padding: 5px 0;
  color: #fff;
  text-decoration: none;
}

.nav-link:hover {
  color: #ddd;
}

.active-link {
  font-weight: bold; 
  color: rgb(173, 173, 219); 
}

.logout-btn {
  margin-top: 20px; 
  width: 100%;
}
</style>
