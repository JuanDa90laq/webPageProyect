<template>
  <div class="d-flex flex-column justify-center align-center mt-5 pa-5">
    <v-img
      :width="500"
      class="mb-5"
      :src="data.imagen"
    ></v-img>
    <span>
      {{ data.text }}
    </span>
  </div>
</template> 

<script setup>
  import axios from 'axios'

  import { ref } from 'vue'

  let data = ref({})

  const fetchData = async () => {
    const response = await axios.get('http://localhost:5000/')
    data.value = response.data
  }
 
  fetchData()
  
</script>
