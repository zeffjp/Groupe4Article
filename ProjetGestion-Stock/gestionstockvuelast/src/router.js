import { createRouter, createWebHistory } from 'vue-router';

import ListClient from './views/client/ListClient-view.vue';
import AddClient from './views/client/AddClient-view.vue';
import ListArticle from './views/article/ListArticle-view.vue';
import AddArticle from './views/article/AddArticle-view.vue';
import ListCategorie from './views/categorie/ListCategorie-view.vue';
import AddCategorie from './views/categorie/AddCategorie-view.vue';
import ListCommande from './views/commande/ListCommande-view.vue';
import AddCommande from './views/commande/AddCommande-view.vue';
import ListAdmin from './views/admin/ListAdmin-view.vue';
import AddAdmin from './views/admin/AddAdmin-view.vue';
import ListVente from './views/vente/ListVente-view.vue';
import AddVente from './views/vente/AddVente-view.vue'; 
import Dashboard from './components/dashboard-component.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
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
    path: '/admins',
    name: 'ListAdmin',
    component: ListAdmin
  },
  {
    path: '/admins/add',
    name: 'AddAdmin',
    component: AddAdmin
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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
