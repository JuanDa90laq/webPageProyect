<template>
    <h1>Este es el usuario con el id {{ route.params.id }}</h1>
    <v-snackbar
      v-model="noData"
      color="primary"
    >
      No hay datos con ese Id

      <template v-slot:actions>
        <v-btn
          color="red"
          variant="text"
          @click="envioValido = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
    <div class="pa-5">
      <div class="d-flex flex-column">
        <div>
          <span>Nombre:</span> {{ data.Name }}
        </div>
        <div>
          <span>Telefono:</span> {{ data.Phone }}
        </div>
        <div>
          <span>Pais:</span> {{ data.Country }}
        </div>
        <div>
          <span>Correo:</span> {{ data.Email }}
        </div>
      </div>
    </div>
  </template>
  <script setup>
    import axios from 'axios'
    import { ref } from 'vue';
    import { useRoute } from 'vue-router'

    const route = useRoute()

    let data = ref({})
    let noData = ref(false)
    const fetchData = async () => {
      try {
        const response = await axios.get( import.meta.env.VITE_API_BASE_URL+`consult?id=${route.params.id}`)
        if (response.data.data){
          data.value = response.data.data
          noData.value = false
        } else{
          noData.value = true
        }
      } catch (error) {
        console.error('error', error)
      }
    }
    
    fetchData()
  </script>