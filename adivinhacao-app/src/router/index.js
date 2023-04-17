import { createRouter, createWebHistory } from 'vue-router';
import JogoPrincipal from '../components/JogoPrincipal.vue';
import ConfiguraPalavras from '../components/ConfiguraPalavras.vue';

const routes = [
  {
    path: '/adivinhacao-app/',
    name: 'Home',
    component: JogoPrincipal
  },
  {
    path: '/adivinhacao-app/configura',
    name: 'Configura',
    component: ConfiguraPalavras
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  base: '/adivinhacao-app/',
});

export default router;
