const express = require('express')

const propostaModel = require('../../models/proposta')


const propostaCrtl = require('../../controllers/proposta.controller')
const app = express()


app.get('/', propostaCrtl.getPropostas);


app.post('/create', propostaCrtl.createProposta)

app.post('/list', async (req: any, res: any) => {
  try {
    const { body } = req
    const { params } = body
    let propostas = []
    if (!params.filter) {
      propostas = await propostaModel.list()
    } else {
      propostas = await propostaModel.search(params.filter)
    }

    res.status(200).send({
      propostas
    })
  } catch (error) {
    return res.status(500).send({
      message: 'Erro ao buscar a lista de Proposta! Error: ' + error,
      success: false
    })
  }
})

app.post('/detalhe', propostaCrtl.getPropostaDetail)

app.patch('/update', propostaCrtl.updateProposta)

module.exports = app;
