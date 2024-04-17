<template>
  <div class="d-flex flex-column justify-center align-center mt-5 pa-5">
    <v-img
      :width="500"
      class="mb-5"
      :src="data.Image"
    ></v-img>
    <span>
      {{ data.Text }}
    </span>
  </div>
</template> 

<script setup>
  import axios from 'axios'

  import { ref } from 'vue'

  let data = ref({})

  const fetchData = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_BASE_URL)
      data.value = response.data
    } catch (error) {
      console.error('error', error)
    }
  }
 
  fetchData()
  
</script>
