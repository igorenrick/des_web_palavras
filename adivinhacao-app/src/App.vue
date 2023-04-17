<template>
  <div id="app">
    <router-link to="/adivinhacao-app">Home</router-link> |
    <router-link to="/adivinhacao-app/configura">Configurar palavras e dicas</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* O estilo permanece o mesmo, sem alterações */
</style>
