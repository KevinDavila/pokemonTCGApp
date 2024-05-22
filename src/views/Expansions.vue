<!-- src/views/About.vue -->
<template>
    <h1>{{ msg }}</h1>
    <h1>Lista de Cartas</h1>
    <div class="grid grid-cols-3">
    <div  v-for="item in items" :key="item.id">
      <img class="col-span-2" :src="item.images.logo" />
    </div>
  </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  
  export default defineComponent({
    name: 'Expansions',
    props:{
  msg: String
  },

  setup(){
    const sets =[
   {id: "sv1"},
   {id: "sv2"},
   {id: "sv3"},
   {id: "sv3pt5"},
   {id: "sv4"},
   {id: "sv4pt5"},
   {id: "sv5"},
    ]
    const items = ref([])
    const fetchData = async () => {
      try {
        for (const iterator of sets) {
            const setId = iterator.id
            const response = await fetch("https://api.pokemontcg.io/v2/sets?q=id:"+setId);
            const data = await  response.json();
            //console.log(data.data[0]);
            items.value.push(data.data[0])
            
        }
        console.log(items.value);
        //const response = await fetch("https://api.pokemontcg.io/v2/cards?q=set.id:sv2");
        //const data = await  response.json();
       
        //items.value = data.data
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