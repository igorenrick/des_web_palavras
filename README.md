# Jogo da Adivinhação de Palavras

Projeto trabalho da disciplina DEC007 Programação para WEB - 2023.1

UFSC Araranguá

Igor Enrick de Carvalho - 18250348

### Para executar
npm install && npm start

## Descrição do Projeto
### 1 Trabalho: Jogo de adivinhação

#### 1.1 Introdução
O objetivo deste trabalho é desenvolver o “jogo da adivinhação”. Neste jogo existem palavras (secretas a serem adivinhadas) e uma dica sobre o que é a tal palavra. Quando um jogador acessa o website (http://localhost:4000) ele recebe uma página com uma dica e o tamanho da palavra que ele precisa adivinhar e um campo para entrada de dados com um botão.

Como exemplo, digamos que a palavra tenha 6 letras e a dica seja “comida” (a palavra secreta neste exemplo é “feijão”. O jogador agora tem 9 tentativas (quantidade de letras da palavra + 3) para acertar. O site envia para o jogador um conjunto vazio de 6 espaços [_,_,_,_,_,_],9 e um indicador que quantas tentativas restam. Neste momento restam 9.

O jogador submete uma letra (digamos a letra “e”. O site retorna [_,E,_,_,_,_]9 e mantém o contador em 9 pois o jogador acertou. Na proxima tentativa o jogador submete letra “x”. O site retorna [_,E,_,_,_,_]8 pois a letra “x” nao está na lista e assim o jogador errou. A situação se repete até o jogador acertar a palavra e ser declarado vencedor ou perder pois usou todas as tentativas.

As palavras e dicas usadas no jogo são sorteadas de uma lista mantida num banco de dados em MongoDB no site (cada palavra está associada a uma dica). Um usuário acessando a rota localhost:4000/configura recebe uma página WEB com a lista das palavras e dicas e alguns botões para remover a palavra/dica, além de campos de entrada de dados para inserir nova palavra/dica. Internamente o servidor possui uma API REST. Por exemplo, se o jogador clicar no botão de remove para remover a palavra feijão, deve ser feita uma chamada AJAX (usando um fetch por exemplo) para acessar a rota /remove

/add requisição POST para adicionar palavras e dicas. Os dados são passados num objeto JSON:

```
{
"palavra":"macarrão",
"dica":"comida italiana"
}
```

/remove requisição POST para remover uma palavra e sua dica associada; Os são passados como JSON:

```
{
"palavra":"feijão"
}
```

/lista requisição GET para listar todas as palavras e dicas. As informações são retornadas pelo servidor como um vetor de objetos JSON:

```
[{"palavra":"feijão","dica":"comida"},{"palavra":"automóvel","dica":"veículo"},{" palavra":"macarrão","dica":"comida italiana"}]
```

Implemente o servidor com websockets na porta 10.000 e um servidor WEB rodando na porta 4000

#### 1.2 Apresentação

O trabalho deve ser apresentado para o professor pelo grupo que o desenvolveu (grupos de no máximo 3 alunos), na data de 08/maio.
