<template>
  <div>
    <h1>Configurações</h1>
    <div v-for="(palavra, index) in palavras" :key="index">
      <p>{{palavra.palavra}} - {{palavra.dica}}</p>
      <button @click="removerPalavra(palavra)">Remover</button>
    </div>
    <div>
      <h2>Adicionar nova palavra</h2>
      <input v-model="novaPalavra" type="text" placeholder="Palavra" />
      <input v-model="novaDica" type="text" placeholder="Dica" />
      <button @click="adicionarPalavra()">Adicionar</button>
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
