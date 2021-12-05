const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Models
const perguntaModel = require('./database/Pergunta');
const respostasModel = require('./database/Resposta');

// Conexão com o banco de dados
const connection = require('./database/database');
connection.authenticate()
.then(() => {
    console.log('Conexão realizada com sucesso!!');
}).catch((e) => {
    console.log('Ocorreu um erro!!');
})

// Setando a view engine
app.set('view engine', 'ejs');
// Arquivos estáticos
app.use(express.static('public'));
// Body parser config
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Rotas
app.get("/", (req, res) => {
    perguntaModel.findAll({ raw: true, order: [
        ['id', 'DESC']
    ] })
    .then(perguntas => {
        res.render('index', {
            perguntas: perguntas
        });
    })
});

app.get('/perguntar', (req, res) => {
    res.render('perguntar');
})

app.get('/pergunta/:id', (req, res) => {
    const id = req.params.id;
    const formataData = require('./public/js/formataHora');

    perguntaModel.findOne({
        where: {
            id: id
        }
    }).then(pergunta => {
        respostasModel.findAll({
            where: {
                perguntaId: id
            },
            raw: true
        }).then(respostas => {
            res.render('pergunta.ejs', {
                pergunta: pergunta,
                respostas: respostas,
                formataData: formataData,
                query: req.query.p
            });  

            console.log(req.query.p);
        })
    }) 
})

app.post('/salvarResposta/:id', (req, res) => {
    const corpo = req.body.comentario;
    const id = parseInt(req.params.id);

    respostasModel.create({
        corpo: corpo,
        perguntaId: id
    }).then(() => {
        res.redirect(`/pergunta/${id}?p=t`);
    });
})

app.post('/salvar', (req, res) => {
    const titulo = req.body.titulo;
    const descricao = req.body.descricao;
    perguntaModel.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    })
})

// Inicialização do server
app.listen("8081", (e) => {
    if(e) {
        console.log("Ocorreu um erro!!");
    } else {
        console.log("Servidor rodando na URL http://localhost:8081");
    }
});