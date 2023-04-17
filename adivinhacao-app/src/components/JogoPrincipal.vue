<template>
    <div>
      <h1>Jogo da Divinhação</h1>
      <p>Dica: {{ dica }}</p>
      <p>Palavra: {{ palavraMascarada }}</p>
      <p>Tentativas restantes: {{ tentativas }}</p>
      <input v-model="entrada" type="text" placeholder="Digite uma letra" maxlength="1" />
      <button @click="enviarTentativa">Enviar</button>
    </div>
  </template>
  
  <script>
  import io from 'socket.io-client';
  
  export default {
    data() {
      return {
        dica: '',
        palavraMascarada: '',
        tentativas: 0,
        entrada: '',
        socket: null,
        title: 'Jogo da Divinhação' // Título padrão da aplicação
      };
    },
    created() {
      this.socket = io('http://localhost:10000');
  
      this.socket.on('connect', () => {
        this.socket.emit('iniciarJogo');
      });
  
      this.socket.on('atualizar', (dados) => {
        this.dica = dados.dica;
        this.palavraMascarada = dados.palavra;
        this.tentativas = dados.tentativas;
      });
  
      this.socket.on('resultado', (vitoria) => {
        if (vitoria) {
          alert('Parabéns! Você venceu!');
        } else {
          alert('Infelizmente você perdeu. Tente novamente.');
        }
        this.socket.emit('iniciarJogo');
      });
    },
    methods: {
      enviarTentativa() {
        const letra = this.entrada.trim().toLowerCase();
        if (letra) {
          this.socket.emit('tentativa', letra);
          this.entrada = '';
        }
      },
    },
    mounted() {
      document.title = this.title; // Alterando o título da aba dinamicamente
    },
  };
  </script>
  
  <style>
  #app {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
  }
  </style>
  
  