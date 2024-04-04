<template>
    <h1>Por favor ingrese los datos para poder realizar la busqueda en nuestra base de datos</h1>
    <form @submit.prevent="submit" class="pa-10">
      <v-text-field
        v-model="id.value.value"
        :counter="10"
        :error-messages="id.errorMessage.value"
        label="Id"
      ></v-text-field>
  
      <div class="mt-10">
        <v-btn
          class="me-4"
          type="submit"
        >
          Buscar
        </v-btn>
  
      <v-btn @click="handleReset">
        Borrar
      </v-btn>
    </div>
      
    </form>
  </template>
  <script setup>
    import { useField, useForm } from 'vee-validate'
    import { useRouter } from 'vue-router'

    const router = useRouter()
  
    const { handleSubmit, handleReset } = useForm({
      validationSchema: {
        id (value) {
          if (value?.length >= 1) return true
  
          return 'Id necesita al menos dos caracteres.'
        },
      },
    })
    const id = useField('id')
  
    const submit = handleSubmit(values => {
      const id = values.id
      
      router.push(`/consult/${id}`)

      handleReset()
    })
  </script>