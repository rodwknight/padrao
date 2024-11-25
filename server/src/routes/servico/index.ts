const express = require('express')

const servicoModel = require('../../models/servico')
const app = express()

app.get('/', async (req: any, res: any) => {
  const servicos = await servicoModel.list()
  app.send(servicos)
});


app.post('/create', async (req: any, res: any) => {

  try {

    const total = await servicoModel.count()

    const anoAtual = new Date().getFullYear();
    const codServico = `S${total + 1}/${anoAtual}`

    await servicoModel.create({ ...req.body, codServico })

    res.status(201).send({
      message: `Serviço cadastrado com sucesso!`,
      success: true
    })

  } catch (error) {
    return res.status(500).send({
      message: 'Erro ao cadastrar Serviço! ' + error,
      success: false
    })
  }
})

app.post('/list', async (req: any, res: any) => {
  try {
    const { body } = req
    const { params } = body
    let servicos = []
    if (!params.filter) {
      servicos = await servicoModel.list()
    } else {
      servicos = await servicoModel.search(params.filter)
    }

    res.status(200).send({
      servicos
    })
  } catch (error) {
    return res.status(500).send({
      message: 'Erro ao buscar a lista de Serviços! ',
      success: false
    })
  }
})

module.exports = app;
