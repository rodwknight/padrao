const express = require('express')
const cors = require('cors')
const app = express();

const loginRoutes = require('./routes/login')
const unidadeRoutes = require('./routes/unidade')
const clienteRoutes = require('./routes/cliente')
const servicoRoutes = require('./routes/servico')
const propostaRoutes = require('./routes/proposta')
const contratoRoutes = require('./routes/contrato')
const ordemRoutes = require('./routes/ordem')

const port = 3000;

app.use(cors())
app.use(express.json());

app.use('/api/login', loginRoutes)
app.use('/api/unidade', unidadeRoutes)
app.use('/api/cliente', clienteRoutes)
app.use('/api/servico', servicoRoutes)
app.use('/api/proposta', propostaRoutes)
app.use('/api/contrato', contratoRoutes)
app.use('/api/ordem', ordemRoutes)

app.listen(port, () => { });
