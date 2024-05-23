<!-- src/views/About.vue -->
<template>
  <div class="grid grid-cols-3 items-center">
    <div v-for="item in items" :key="item.id">
      <RouterLink :to="{name: 'Set', params: { setID: item.id, setName: item.name}}">
        <img class="h-auto max-w-xs" :src="item.images.logo" />
      </RouterLink>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
const getSets = import('../utils/dataExpansions')
export default defineComponent({
  name: 'Expansions',
  props:{
    msg: String
  },

  setup(){
    const items = ref([])
    const fetchData = async () => {
      getSets.then((module) => {
        const getSets = module.default
        const itemSet = getSets()
        for (const item of itemSet.set) {
          items.value.push(item)
        }
      })
      .catch((error) => console.log(error))
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