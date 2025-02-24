const express = require('express')

const ordemCrtl = require('../../controllers/ordem.controller')
const app = express()

app.get('/', ordemCrtl.getOrdens);

//app.post('/create', ordemCrtl.createOrdem)

app.post('/list', ordemCrtl.getOrdensSearch)

//app.post('/detalhe', ordemCrtl.getOrdemDetail)

//app.patch('/update', ordemCrtl.updateOrdem)

module.exports = app;
