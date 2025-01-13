const express = require('express')

const propostaModel = require('../../models/proposta')
const propostaServicoModel = require('../../models/proposta-servico')
const app = express()

app.get('/', async (req: any, res: any) => {
  const propostas = await propostaModel.list()
  app.send(propostas)
});


app.post('/create', async (req: any, res: any) => {

  try {

    const { idCliente, idUnidade, funcionarios, deslocamento, valorDeslocamento, servicos } = req.body
    const total = await propostaModel.count()
    const anoAtual = new Date().getFullYear();

    const data = {
      idCliente,
      idUnidade,
      funcionarios,
      deslocamento,
      valorDeslocamento,
      codProposta: `P${total + 1}/${anoAtual}`
    }

    const proposta = await propostaModel.create(data)

    for (let servico of servicos) {
      await propostaServicoModel.create({
        idProposta: proposta.id,
        idServico: servico.id,
        valor: servico.valor
      })
    }

    res.status(201).send({
      message: `Proposta cadastrado com sucesso!`,
      proposta,
      success: true
    })

  } catch (error) {
    return res.status(500).send({
      message: 'Erro ao cadastrar Proposta! Error: ' + error,
      success: false
    })
  }
})

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
      message: 'Erro ao buscar a lista de Proposta! ',
      success: false
    })
  }
})

module.exports = app;
