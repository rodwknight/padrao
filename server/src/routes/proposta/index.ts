const express = require('express')

const propostaCrtl = require('../../controllers/proposta.controller')
const app = express()

app.get('/', propostaCrtl.getPropostas)

app.post('/create', propostaCrtl.createProposta)

app.post('/list', propostaCrtl.getListPropostas)

app.post('/detalhe', propostaCrtl.getPropostaDetail)

app.patch('/update', propostaCrtl.updateProposta)

module.exports = app;
