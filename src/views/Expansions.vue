<!-- src/views/About.vue -->
<template>
    <h1>{{ msg }}</h1>
    <h1>Lista de Cartas</h1>
    <div class="grid grid-cols-3">
    <div v-for="item in items" :key="item.id">
      <RouterLink :to="{name: 'Set', params: { setID: item.id, setName: item.name}}">
        <img class="h-auto max-w-xs" :src="item.images.logo" />
      </RouterLink>
    </div>
  </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import  getSets  from '../utils/dataExpansions'
  export default defineComponent({
    name: 'Expansions',
    props:{
    msg: String
  },

  setup(){
    const sets = getSets()
    const items = ref([])
    const fetchData = async () => {
      try {
        for (const itemSet of sets.set) {
            items.value.push(itemSet)   
        }
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