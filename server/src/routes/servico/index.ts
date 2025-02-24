const express = require('express')

const servicoCtrl = require('../../controllers/servico.controller')
const app = express()

app.get('/', servicoCtrl.getServicos)

app.post('/create', servicoCtrl.createServico)

app.post('/list', servicoCtrl.getListServicos)

module.exports = app;
