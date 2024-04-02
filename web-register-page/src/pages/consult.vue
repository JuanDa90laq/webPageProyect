<template>
    <h1>Por favor ingrese los datos para poder realizar la busqueda en nuestra base de datos</h1>
    <form @submit.prevent="submit" class="pa-10">
      <v-text-field
        v-model="name.value.value"
        :counter="10"
        :error-messages="name.errorMessage.value"
        label="Nombre"
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
  
    const { handleSubmit, handleReset } = useForm({
      validationSchema: {
        name (value) {
          if (value?.length >= 2) return true
  
          return 'Nombre necesita al menos dos caracteres.'
        },
      },
    })
    const name = useField('name')
  
    const submit = handleSubmit(values => {
      const formValue = JSON.stringify(values, null, 2)
      console.log(formValue)
      handleReset()
    })
  </script>