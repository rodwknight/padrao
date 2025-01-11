const express = require('express')

const orcamentoModel = require('../../models/orcamento')
const app = express()

app.get('/', async (req: any, res: any) => {
  const orcamentos = await orcamentoModel.list()
  app.send(orcamentos)
});


app.post('/create', async (req: any, res: any) => {

  try {

    const total = await orcamentoModel.count()

    const anoAtual = new Date().getFullYear();
    const codOrcamento = `O${total + 1}/${anoAtual}`

    await orcamentoModel.create({ ...req.body, codOrcamento })

    res.status(201).send({
      message: `Orçamento cadastrado com sucesso!`,
      success: true
    })

  } catch (error) {
    return res.status(500).send({
      message: 'Erro ao cadastrar Orçamento! ',
      success: false
    })
  }
})

app.post('/list', async (req: any, res: any) => {
  try {
    const { body } = req
    const { params } = body
    let orcamentos = []
    if (!params.filter) {
      orcamentos = await orcamentoModel.list()
    } else {
      orcamentos = await orcamentoModel.search(params.filter)
    }

    res.status(200).send({
      orcamentos
    })
  } catch (error) {
    return res.status(500).send({
      message: 'Erro ao buscar a lista de Orçamento! ',
      success: false
    })
  }
})

module.exports = app;
