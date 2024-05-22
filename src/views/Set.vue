<!-- src/views/About.vue -->
<template>
    <h1>Lista de Cartas {{ setName }}</h1>
    <div class="grid grid-cols-4 gap-4 mt-6">
    <div v-for="item in items" :key="item.id">
      <img class="col-span-2" :src="item.images.small" />
    </div>
  </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import getPaldeaFates from '../utils/dataSetPaldeaFates';
  export default defineComponent({
    name: 'Set',
    props:{
    setID: String,
    setName: String,
    msg: String
    },

  setup(props){
    const items = ref([]);
    const fetchData = async () => {
      console.log(props.setID)
      const id = props.setID
      try {
        //const response = await fetch("https://api.pokemontcg.io/v2/cards?q=set.id:"+id);
        const response =  getPaldeaFates()
        const data =   response.data;
        console.log(data)
        items.value = data
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