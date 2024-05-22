<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <nav class="text-white absolute top-0 z-50">
  <div class="container mx-auto px-4">
    <div class="flex justify-between items-center py-4">
      <!-- Logo -->
      <img class="size-16" src="./assets/Poke_Ball_icon.svg" />      
      <!-- Links de navegación -->
      <ul class="flex space-x-4">
        <li><router-link class="hover:text-gray-300" to="/">Home</router-link></li>
        <li><router-link class="hover:text-gray-300" to="/expansions" >Expansions</router-link></li>
        <li><a href="#" class="hover:text-gray-300">Servicios</a></li>
        <li><a href="#" class="hover:text-gray-300">Contacto</a></li>
      </ul>
    </div>
  </div>
</nav>
  <!-- <div class="bg-gray-800 text-white w-full fixed top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <router-link class="hover:text-gray-300" to="/">Home</router-link>
      <router-link class="hover:text-gray-300" to="/expansions" >Expansions</router-link>
      </div>
    </div>
  </div> -->
  <div class="md:container md:mx-auto">
    <RouterView />
  </div>

</template>

<style scoped>
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>
