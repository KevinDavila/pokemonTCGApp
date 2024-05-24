<!-- src/views/About.vue -->
<template>
  <div class="">
    <div v-if="isLoading" class="flex items-center justify-center">
      <!-- Loading Spinner -->
      <!-- <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div> -->
      <img src="../assets/Poke_Ball_icon.svg" alt="Loading..." class="animate-spin h-32 w-32" />
    </div>
    <div v-else>
      <div class="flex justify-center items-center">
        <img class="object-fit size-auto" :src="setImage"/>
      </div>
      <input class="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" label="Search" v-model="searchTerm" placeholder="Search Card"/>
      <div class="grid grid-cols-4 gap-4 mt-6">
        <div v-for="(item, index) in filteredCards" :key="index">
          <img @click="openModal(item.images.large)" class="col-span-2 cursor-pointer " :src="item.images.small" :alt="item.name"/>
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
  import { defineComponent, ref, onMounted, computed } from 'vue';

  const getSetExpansion  = import("../utils/dataSetExpansion")
  export default defineComponent({
    name: 'Set',
    props:{
      setID: String,
    },

  setup(props){
    const setImage = ref("")
    const items = ref([]);
    const isLoading = ref(true);
    const fetchData = async () => {
      try{    
        const id = props.setID
        console.log(props)
        /* const response = await fetch("https://api.pokemontcg.io/v2/cards?q=set.id:"+id);
        const data = await response.json()
        items.value = data.data */
        await getSetExpansion.then((module) => {
          const dataSetExpansion = module.default
          const getCardsByExpansion = dataSetExpansion(id);
          getCardsByExpansion.then((module: { default: any; })=>{
              const res = module.default
              const data = res()
              items.value = data.data
              setImage.value = items.value[0].set.images.logo
          })
        })
       
      } catch(error){
        console.error(error)
      }finally{
        isLoading.value = false;
      }
    };
    const searchTerm = ref('')
    const filteredCards = computed(()=>{
      return items.value.filter(item => item.name.toLowerCase().includes(searchTerm.value.toLowerCase()))
    })
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
      isLoading,
      searchTerm,
      filteredCards,
      setImage
    };
  },
  });
  </script>