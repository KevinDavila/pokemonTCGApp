<!-- src/views/About.vue -->
<template>
  <div class="mt-10">
    <h1>{{ setName }}</h1>
    <div v-if="isLoading" class="flex items-center justify-center">
      <!-- Loading Spinner -->
      <!-- <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div> -->
      <img src="../assets/Poke_Ball_icon.svg" alt="Loading..." class="animate-spin h-32 w-32" />
    </div>
    <div v-else>
      <div class="grid grid-cols-4 gap-4 mt-6">
        <div v-for="(item, index) in items" :key="index">
          <img @click="openModal(item.images.large)" class="col-span-2 cursor-pointer " :src="item.images.small" />
          <div v-if="item.hasOwnProperty('tcgplayer')">
            <a :href="item.tcgplayer.url" target="blank">TCGPlayer</a>
            <div v-for="(key,value) in item.tcgplayer.prices" :key="value">
              <span>{{ value }} - market: ${{ key.market }} USD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50" @click="closeModal">
      <div class="relative rounded-lg p-4">
        <img :src="selectedImage" alt="Selected image" class="max-w-full max-h-[93vh] object-contain" @click.stop />
      </div>
    </div>
  </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';

  //const getPaldeaFates  = import("../utils/dataSetPaldeaFates")
  export default defineComponent({
    name: 'Set',
    props:{
      setID: String,
      setName: String,
      msg: String
    },

  setup(props){
    const items = ref([]);
    const isLoading = ref(true);
    const fetchData = async () => {
      try{

      
        const id = props.setID
        console.log(id)
        const response = await fetch("https://api.pokemontcg.io/v2/cards?q=set.id:"+id);
        const data = await response.json()
        items.value = data.data
        /* getPaldeaFates.then((module) => {
        const getDataSetPaldeaFates = module.default
        const res = getDataSetPaldeaFates()
        items.value = res.data
        }) */
      } catch(error){
        console.error(error)
      }finally{
        isLoading.value = false;
      }
    };
    const isModalOpen = ref(false);
    const selectedImage = ref<string | null>(null);

    const openModal = (imageSrc: string) => {
      selectedImage.value = imageSrc;
      isModalOpen.value = true;
    };
    const closeModal = () => {
      isModalOpen.value = false;
      selectedImage.value = null;
    };
    onMounted(() => {
      fetchData();
    });
    return {
      items,
      isModalOpen,
      selectedImage,
      openModal,
      closeModal,
      isLoading
    };
  },
  });
  </script>