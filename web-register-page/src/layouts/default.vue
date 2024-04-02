<template>
  <v-app>
    <v-main>
      <v-layout class="rounded rounded-md">
        <v-app-bar title="Web Aplication"></v-app-bar>

        <v-navigation-drawer>
          <v-list>
            <v-list-item link to="/" title="Inicio"></v-list-item>
            <v-list-item link to="register" title="Registro"></v-list-item>
            <v-list-item link to="consult" title="Consulta"></v-list-item>
          </v-list>
        </v-navigation-drawer>

        <v-main class="h-screen">
          <router-view />
        </v-main>
      </v-layout>
      <AppFooter />
    </v-main>
  </v-app>
</template>

<script setup>
  //
</script>
