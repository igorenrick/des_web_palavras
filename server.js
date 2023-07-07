require('dotenv').config();
const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

// Conectar ao banco de dados MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Definir o modelo Palavra
const PalavraSchema = new mongoose.Schema({
    palavra: String,
    dica: String,
});

const Palavra = mongoose.model('Palavra', PalavraSchema);

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/adivinhacao-app', express.static(path.join(__dirname, 'public/adivinhacao-app')));

const server = http.createServer(app);
const io = socketIO(server);

// Inicializar servidor WEB na porta 4000
server.listen(4000, () => {
    console.log('Servidor WEB rodando na porta 4000');
});

// Inicializar servidor WebSocket na porta 10000
const websocketServer = http.createServer();
const ioWebSocket = socketIO(websocketServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
websocketServer.listen(10000, () => {
    console.log('Servidor WebSocket rodando na porta 10000');
});

// Implementar rotas e APIs
app.use(express.json());

app.post('/add', async (req, res) => {
    const { palavra, dica } = req.body;
    const novaPalavra = new Palavra({ palavra, dica });
    await novaPalavra.save();
    res.sendStatus(201);
});

app.post('/remove', async (req, res) => {
    const { palavra } = req.body;
    await Palavra.deleteOne({ palavra });
    res.sendStatus(200);
});

app.get('/lista', async (req, res) => {
    const palavras = await Palavra.find();
    res.json(palavras);
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});


// Função auxiliar para verificar se todas as letras foram preenchidas
function todasLetrasPreenchidas(palavraMascarada) {
    return palavraMascarada.every(letra => letra !== '_');
}

// Lógica do jogo com WebSocket
ioWebSocket.on('connection', (socket) => {
    let palavraSecreta;
    let dica;
    let palavraMascarada;
    let tentativas;

    // Função para sortear uma palavra e iniciar o jogo
    async function sortearPalavra() {
        const palavras = await Palavra.find();
        const palavraSorteada = palavras[Math.floor(Math.random() * palavras.length)];
        palavraSecreta = palavraSorteada.palavra;
        dica = palavraSorteada.dica;
        palavraMascarada = Array(palavraSecreta.length).fill('_');
        tentativas = palavraSecreta.length + 3;
    }

    socket.on('iniciarJogo', async () => {
        await sortearPalavra();
        socket.emit('atualizar', {
            dica,
            palavra: palavraMascarada.join(' '),
            tentativas,
        });
    });

    socket.on('tentativa', async (letra) => {
        let acertou = false;
        let i = 0;
        let indiceMascarada = 0;

        while (i < palavraSecreta.length) {
            if (/[a-zA-Z]/.test(palavraSecreta[i])) {
                const letraNormalizadaSecreta = palavraSecreta[i].toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
                const letraNormalizadaTentativa = letra.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

                if (letraNormalizadaSecreta === letraNormalizadaTentativa) {
                    palavraMascarada[indiceMascarada] = palavraSecreta[i];
                    acertou = true;
                }
                indiceMascarada++;
            } else {
                if (acertou) {
                    palavraMascarada[indiceMascarada] = '';
                }
                indiceMascarada++;
            }
            i++;
        }

        if (!acertou) {
            tentativas--;
        }

        if (tentativas <= 0 || todasLetrasPreenchidas(palavraMascarada)) {
            if (todasLetrasPreenchidas(palavraMascarada)) {
                socket.emit('atualizar', {
                    dica,
                    palavra: palavraSecreta,
                    tentativas,
                });
            }
            socket.emit('resultado', {
                vitoria: todasLetrasPreenchidas(palavraMascarada),
                palavraCompleta: palavraSecreta
            });
            await sortearPalavra();
            socket.emit('atualizar', {
                dica,
                palavra: palavraMascarada.join(' '),
                tentativas,
            });
        } else {
            socket.emit('atualizar', {
                dica,
                palavra: palavraMascarada.join(' '),
                tentativas,
            });
        }


    });



});
