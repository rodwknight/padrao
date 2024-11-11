const express = require('express')

const unidadeModel = require('../../models/unidade')
const app = express()

app.get('/', async (req: any, res: any) => {
  const unidades = await unidadeModel.list()
  app.send(unidades)
});


app.post('/create', async (req: any, res: any) => {

  try {

    const total = await unidadeModel.count()

    const anoAtual = new Date().getFullYear();
    const codUnidade = `U${total + 1}/${anoAtual}`

    await unidadeModel.create({ ...req.body, codUnidade })

    res.status(201).send({
      message: `Unidade cadastrada com sucesso!`,
      success: true
    })

  } catch (error) {
    return res.status(500).send({
      message: 'Erro ao cadastrar Unidade! ',
      success: false
    })
  }
})

app.post('/list', async (req: any, res: any) => {
  try {
    const { body } = req
    const { params } = body
    let unidades = []
    if (!params.filter) {
      unidades = await unidadeModel.list()
    } else {
      unidades = await unidadeModel.search(params.filter)
    }

    res.status(200).send({
      unidades
    })
  } catch (error) {
    return res.status(500).send({
      message: 'Erro ao buscar a lista de Unidade! ',
      success: false
    })
  }
})

module.exports = app;
