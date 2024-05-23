<!-- src/views/About.vue -->
<template>
  <div class="mt-10">
    <h1>{{ setName }}</h1>
    <div class="grid grid-cols-4 gap-4 mt-6">
      <div v-for="item in items" :key="item.id">
        <img class="col-span-2" :src="item.images.small" />
        <span v-if="item.hasOwnProperty('tcgplayer')">{{ item.tcgplayer }}</span>
      </div>
    </div>
  </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  const getPaldeaFates  = import("../utils/dataSetPaldeaFates")
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
      //const id = props.setID
        //const response = await fetch("https://api.pokemontcg.io/v2/cards?q=set.id:"+id);
        getPaldeaFates.then((module) => {
         const getDataSetPaldeaFates = module.default
        const res = getDataSetPaldeaFates()
        items.value = res.data
        console.log(items)
        })
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