import { createRouter, createWebHistory } from 'vue-router';

import ListClient from './views/client/ListClient-view.vue';
import AddClient from './views/client/AddClient-view.vue';
import ListArticle from './views/article/ListArticle-view.vue';
import AddArticle from './views/article/AddArticle-view.vue';
import ListCategorie from './views/categorie/ListCategorie-view.vue';
import AddCategorie from './views/categorie/AddCategorie-view.vue';
import ListCommande from './views/commande/ListCommande-view.vue';
import AddCommande from './views/commande/AddCommande-view.vue';

import ListVente from './views/vente/ListVente-view.vue';
import AddVente from './views/vente/AddVente-view.vue'; 
import Home from './components/Home-component.vue';
import WelcoMemessage from './views/Acceuil/Acceuil-view.vue';
import ListeCategorie from './views/categorie/ListCategorie-view.vue'; 
import ListeArticle from './views/article/ListArticle-view.vue';
import ListeCommande from './views/commande/ListCommande-view.vue';
import ListeVente from './views/vente/ListVente-view.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/acceuil',
    name: 'WelcoMemessage',
    component: WelcoMemessage
  },
  {
    path: '/clients',
    name: 'ListClient',
    component: ListClient
  },
  {
    path: '/clients/add',
    name: 'AddClient',
    component: AddClient
  },
  {
    path: '/articles',
    name: 'ListArticle',
    component: ListArticle
  },
  {
    path: '/articles/add',
    name: 'AddArticle',
    component: AddArticle
  },
  {
    path: '/categories',
    name: 'ListCategorie',
    component: ListCategorie
  },
  {
    path: '/categories/add',
    name: 'AddCategorie',
    component: AddCategorie
  },
  {
    path: '/commandes',
    name: 'ListCommande',
    component: ListCommande
  },
  {
    path: '/commandes/add',
    name: 'AddCommande',
    component: AddCommande
  },
 
  {
    path: '/ventes',
    name: 'ListVente',
    component: ListVente
  },
  {
    path: '/ventes/add',
    name: 'AddVente',
    component: AddVente
  },
  {
    path: '/articles/ListeArticle-view',
    name: 'ListeArticle',
    component: ListeArticle
  },
  {
    path: '/commandes/ListeCommande-view',
    name: 'ListeCommande',
    component: ListeCommande
  },
  {
    path: '/ventes/ListeVente-view',
    name: 'ListeVente',
    component: ListeVente
  },
  {
    path: '/categories/ListeCategorie-view',
    name: 'ListeCategorie',
    component: ListeCategorie
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
