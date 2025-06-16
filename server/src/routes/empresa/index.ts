const express = require('express')

const empresaCtrl = require('../../controllers/empresa.controller')
const app = express()

app.get('/', empresaCtrl.getEmpresa)

module.exports = app;
