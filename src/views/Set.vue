<!-- src/views/About.vue -->
<template>
    <h1>{{ msg }}</h1>
    <h1>Lista de Cartas</h1>
    <div class="grid grid-cols-3">
    <div  v-for="item in items" :key="item.id">
      <img class="col-span-2" :src="item.images.small" />
    </div>
  </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  
  export default defineComponent({
    name: 'Set',
    props:{
  msg: String
  },

  setup(){
    const items = ref([]);
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.pokemontcg.io/v2/cards?q=set.id:sv2");
        const data = await  response.json();
        console.log(data)
        items.value = data.data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    onMounted(() => {
      fetchData();
    });
    return {
      items,
    };
  },
  });
  </script>