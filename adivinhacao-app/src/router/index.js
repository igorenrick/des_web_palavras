import { createRouter, createWebHistory } from 'vue-router';
import JogoPrincipal from '../components/JogoPrincipal.vue';
import ConfiguraPalavras from '../components/ConfiguraPalavras.vue';

const routes = [
  {
    path: '/',
    name: 'Jogo',
    component: JogoPrincipal
  },
  {
    path: '/configura',
    name: 'Configura',
    component: ConfiguraPalavras
  }
];


const router = createRouter({
  history: createWebHistory(),
  routes,
  base: '/',
});

export default router;
