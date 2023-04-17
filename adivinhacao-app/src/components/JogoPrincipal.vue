<template>
  <div>
    <h1>Jogo da Divinhação</h1>
    <p>Dica: {{ dica }}</p>
    <p>Palavra: {{ palavraMascarada }}</p>
    <p>Tentativas restantes: {{ tentativas }}</p>
    <input v-model="entrada" type="text" placeholder="Digite uma letra" maxlength="1" />
    <button @click="enviarTentativa">Enviar</button>
  </div>
  <div id="modal" class="modal" ref="modal">
    <div class="modal-content">
      <p v-if="resultado && resultado.vitoria">Parabéns! Você venceu! A palavra era "{{ resultado.palavraCompleta }}".</p>
      <p v-else-if="resultado">Infelizmente você perdeu. A palavra era "{{ resultado.palavraCompleta }}". Tente novamente.
      </p>
      <button class="btn" @click="fecharModal">Fechar</button>
    </div>
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
      title: 'Jogo da Divinhação', // Título padrão da aplicação
      resultado: null,
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

    this.socket.on('resultado', (resultado) => {
      this.resultado = resultado;
      this.$refs.modal.style.display = "block";
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
    fecharModal() {
      this.$refs.modal.style.display = "none";
      this.resultado = null;
    },
  },
  mounted() {
    document.title = this.title; // Alterando o título da aba dinamicamente
  },
};
</script>
  
<style scoped>
h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

p {
  font-size: 1.25rem;
  font-weight: 500;
}

input {
  font-size: 1rem;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
}

button {
  font-size: 1rem;
  font-weight: 600;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
}

button:hover {
  background-color: #0056b3;
}

.modal {
  display: none;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
}

.btn {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}
</style>