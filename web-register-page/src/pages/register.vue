<template>
    <h1>Por favor ingrese los datos para poder ingresar a nuestra base de datos</h1>
    <v-snackbar
      v-model="envioValido"
      color="primary"
    >
      Se envio la informacion correctamente

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
    <form @submit.prevent="submit" class="pa-10">
      <v-text-field
        v-model="name.value.value"
        :counter="10"
        :error-messages="name.errorMessage.value"
        label="Nombre"
      ></v-text-field>
  
      <v-text-field
        v-model="phone.value.value"
        :counter="7"
        :error-messages="phone.errorMessage.value"
        label="Numero de telefono"
      ></v-text-field>
  
      <v-text-field
        v-model="email.value.value"
        :error-messages="email.errorMessage.value"
        label="E-mail"
      ></v-text-field>
  
      <v-select
        v-model="select.value.value"
        :error-messages="select.errorMessage.value"
        :items="items"
        label="Pais"
      ></v-select>
  
      <v-checkbox
        v-model="checkbox.value.value"
        :error-messages="checkbox.errorMessage.value"
        label="Tratamiento de datos"
        type="checkbox"
        value="1"
      ></v-checkbox>
      <div class="mt-10">
        <v-btn
          class="me-4"
          type="submit"
        >
          Enviar
        </v-btn>
  
      <v-btn @click="handleReset">
        Borrar
      </v-btn>
    </div>
      
    </form>
  </template>
  <script setup>
    import { ref } from 'vue'
    import { useField, useForm } from 'vee-validate'
    import axios from 'axios'
  
    const { handleSubmit, handleReset } = useForm({
      validationSchema: {
        name (value) {
          if (value?.length >= 2) return true
  
          return 'Nombre necesita al menos dos caracteres.'
        },
        phone (value) {
          if (value?.length > 9 && /[0-9-]+/.test(value)) return true
  
          return 'El numero de telefono debe de ser de al menos nueve digitos.'
        },
        email (value) {
          if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(value)) return true
  
          return 'Correo debe de ser valido.'
        },
        select (value) {
          if (value) return true
  
          return 'Seleccione un pais.'
        },
        checkbox (value) {
          if (value === '1') return true
  
          return 'Debe de aceptar el tratamiento de datos.'
        },
      },
    })
    const name = useField('name')
    const phone = useField('phone')
    const email = useField('email')
    const select = useField('select')
    const checkbox = useField('checkbox')
  
    const items = ref([
      'Colombia',
      'Peru',
      'Argentina',
      'Chile',
    ])

    const envioValido = ref(false)
  
    const submit =  handleSubmit(async values => {
      try {
        const formValue = JSON.stringify(values)
        const response = await axios.post('http://localhost:5000/ingresar', formValue )
        
        if(response.data.success)
          envioValido.value = true
        handleReset()
      } catch (error) {
        console.error('error', error)
      }
      
    })
  </script>