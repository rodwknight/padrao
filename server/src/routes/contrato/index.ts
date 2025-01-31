const express = require('express')


const contratoCrtl = require('../../controllers/contrato.controller')

const app = express()


app.get('/', contratoCrtl.getContratos);
app.post('/list', contratoCrtl.getListContratos)
app.post('/detalhe', contratoCrtl.getContratoDetail)
app.patch('/update', contratoCrtl.updateContrato)

module.exports = app;
