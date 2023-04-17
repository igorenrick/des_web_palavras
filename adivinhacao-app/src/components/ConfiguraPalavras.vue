<template>
  <div>
    <h1>Configurações</h1>
    <div v-for="(palavra, index) in palavras" :key="index" class="palavra-item">
      <p><strong>Palavra:</strong> {{palavra.palavra}} | <strong>Dica:</strong> {{palavra.dica}}</p>
      <button @click="removerPalavra(palavra)">Remover</button>
    </div>
    <div>
      <h2>Adicionar nova palavra</h2>
      <input v-model="novaPalavra" type="text" placeholder="Palavra" />
      <input v-model="novaDica" type="text" placeholder="Dica" />
      <button class="btn-adicionar" @click="adicionarPalavra()">Adicionar</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      palavras: [],
      novaPalavra: '',
      novaDica: ''
    }
  },
  mounted() {
    this.carregarPalavras()
  },
  methods: {
    async carregarPalavras() {
      const response = await fetch('/lista')
      const palavras = await response.json()
      this.palavras = palavras
    },
    async adicionarPalavra() {
      if (!this.novaPalavra || !this.novaDica) return

      const response = await fetch('/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          palavra: this.novaPalavra,
          dica: this.novaDica
        })
      })

      if (response.ok) {
        this.novaPalavra = ''
        this.novaDica = ''
        await this.carregarPalavras()
      }
    },
    async removerPalavra(palavra) {
      const response = await fetch('/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          palavra: palavra.palavra
        })
      })

      if (response.ok) {
        await this.carregarPalavras()
      }
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

p {
  font-size: 1.25rem;
  font-weight: 500;
}

button {
  font-size: 1rem;
  font-weight: 600;
  padding: 10px 20px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-left: 1rem;
}

button:hover {
  background-color: #c82333;
}

.btn-adicionar {
  background-color: #28a745;
}

.btn-adicionar:hover {
  background-color: #218838;
}

input {
  font-size: 1rem;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  margin-right: 1rem;
}
.palavra-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
</style>
