<template>
  <div id="app">
    <div class="header">
      <router-link to="/adivinhacao-app">Jogo</router-link> |
      <router-link to="/adivinhacao-app/configura">Configurar Palavras</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f8f9fa;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.router-link-active {
  font-weight: bold;
  color: #007bff;
}

.router-link-exact-active {
  color: #007bff;
}

a.router-link-active {
  text-decoration: none;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>


