<!-- src/views/About.vue -->
<template>
  <div class="mt-10">
    <h1>{{ setName }}</h1>
    <div class="grid grid-cols-4 gap-4 mt-6">
      <div v-for="(item, index) in items" :key="index">
        <img @click="openModal(item.images.large)" class="col-span-2" :src="item.images.small" />
        <div v-if="item.hasOwnProperty('tcgplayer')">
          <a :href="item.tcgplayer.url" cursor-pointer target="blank">TCGPlayer</a>
          <div v-for="(key,value) in item.tcgplayer.prices" :key="value">
            <span>{{ value }} - market: {{ key.market }} mid: {{ key.mid }}</span>
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
    const isModalOpen = ref(false);
    const selectedImage = ref<string | null>(null);

    const openModal = (imageSrc: string) => {
      console.log(imageSrc)
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
      closeModal
    };
  },
  });
  </script>