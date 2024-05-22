// src/router.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Expansions from '../views/Expansions.vue';
import Set from '../views/Set.vue'

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
  },
  {
    path: '/set/:setID/:setName',
    name: 'Set',
    component: Set,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;