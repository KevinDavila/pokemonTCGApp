// src/router.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Expansions from '../views/Expansions.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/expansions',
    name: 'Expansions',
    component: Expansions
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;