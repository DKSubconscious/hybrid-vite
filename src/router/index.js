import { createRouter, createWebHistory } from 'vue-router';

// pages
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import ContactView from '../views/ContactView.vue';
import AccountView from '../views/AccountView.vue';
import LoginView from '../views/LoginView.vue';

const routes = [
  { path: '/app', name: 'app', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/contact', name: 'contact', component: ContactView },
  { path: '/account', name: 'account', component: AccountView },
  { path: '/login', name: 'login', component: LoginView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
