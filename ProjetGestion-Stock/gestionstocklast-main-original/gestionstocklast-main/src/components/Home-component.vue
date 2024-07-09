<template>
  <div class="home">
    <div class="nav-links">
      <ul class="list-unstyled">
        <li>
          <router-link to="/acceuil" class="nav-link active-link">Accueil</router-link>
        </li>
        <li class="dropdown">
          <button class="btn btn-link expand-btn" @click="toggleSubMenu('client')">
            <span>{{ isSubMenuExpanded('client') ? '-' : '+' }}</span> Clients
          </button>
          <ul class="sub-menu" v-show="isSubMenuExpanded('client')">
            <li><router-link to="/clients" class="nav-link active-link">Liste des Clients</router-link></li>
            <li><router-link to="/clients/add" class="nav-link active-link">Ajouter un Client</router-link></li>
          </ul>
        </li>
        <li class="dropdown">
          <button class="btn btn-link expand-btn" @click="toggleSubMenu('article')">
            <span>{{ isSubMenuExpanded('article') ? '-' : '+' }}</span> Articles
          </button>
          <ul class="sub-menu" v-show="isSubMenuExpanded('article')">
            <li><router-link to="/articles" class="nav-link active-link">Liste des Articles</router-link></li>
            <li><router-link to="/articles/add" class="nav-link active-link">Ajouter un Article</router-link></li>
          </ul>
        </li>
        <li class="dropdown">
          <button class="btn btn-link expand-btn" @click="toggleSubMenu('categorie')">
            <span>{{ isSubMenuExpanded('categorie') ? '-' : '+' }}</span> Catégories
          </button>
          <ul class="sub-menu" v-show="isSubMenuExpanded('categorie')">
            <li><router-link to="/categories" class="nav-link active-link">Liste des Catégories</router-link></li>
            <li><router-link to="/categories/add" class="nav-link active-link">Ajouter une Catégorie</router-link></li>
          </ul>
        </li>
        <li class="dropdown">
          <button class="btn btn-link expand-btn" @click="toggleSubMenu('commande')">
            <span>{{ isSubMenuExpanded('commande') ? '-' : '+' }}</span> Commandes
          </button>
          <ul class="sub-menu" v-show="isSubMenuExpanded('commande')">
            <li><router-link to="/commandes" class="nav-link active-link">Liste des Commandes</router-link></li>
            <li><router-link to="/commandes/add" class="nav-link active-link">Ajouter une Commande</router-link></li>
          </ul>
        </li>
        <li class="dropdown">
          <button class="btn btn-link expand-btn" @click="toggleSubMenu('admin')">
            <span>{{ isSubMenuExpanded('admin') ? '-' : '+' }}</span> Administrateurs
          </button>
          <ul class="sub-menu" v-show="isSubMenuExpanded('admin')">
            <li><router-link to="/admins" class="nav-link active-link">Liste des Administrateurs</router-link></li>
            <li><router-link to="/admins/add" class="nav-link active-link">Ajouter un Administrateur</router-link></li>
          </ul>
        </li>
        <li class="dropdown">
          <button class="btn btn-link expand-btn" @click="toggleSubMenu('vente')">
            <span>{{ isSubMenuExpanded('vente') ? '-' : '+' }}</span> Ventes
          </button>
          <ul class="sub-menu" v-show="isSubMenuExpanded('vente')">
            <li><router-link to="/ventes" class="nav-link active-link">Liste des Ventes</router-link></li>
            <li><router-link to="/ventes/add" class="nav-link active-link">Ajouter une Vente</router-link></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  data() {
    return {
      expandedMenu: null
    };
  },
  methods: {
    toggleSubMenu(menuName) {
      this.expandedMenu = this.expandedMenu === menuName ? null : menuName;
    },
    isSubMenuExpanded(menuName) {
      return this.expandedMenu === menuName;
    }
  }
};
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Orbitron', sans-serif;
  color: rgb(192, 198, 198);
}

.nav-links {
  width: 100%;
}

.nav-links ul {
  list-style-type: none;
  padding: 0;
}

.nav-links ul li {
  margin: 40px 0;
}

.nav-link {
  text-decoration: none;
  color: rgb(60, 67, 67);
}

.nav-link:hover, .active-link {
  font-weight: bold;
  color: #8d969e;
}

.dropdown {
  position: relative;
}

.expand-btn {
  color: #241c1c;
  background: none;
  border: none;
  font-weight: bold;
  cursor: pointer;
}

.expand-btn:hover {
  color: #5f5f71;
}

.sub-menu {
  list-style-type: none;
  padding: 0;
  margin: 5px 0 0 20px;
}

.sub-menu li {
  text-align: left;
}

.sub-menu li a {
  text-decoration: none;
  display: block;
  padding: 10px;
  color: #333;
  transition: background-color 0.3s;
}

.sub-menu li a:hover {
  background-color: #ddd;
}
</style>
