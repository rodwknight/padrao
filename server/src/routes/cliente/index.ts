const express = require('express')

const clienteModel = require('../../models/cliente')
const app = express()

app.get('/', async (req: any, res: any) => {
  const clientes = await clienteModel.list()
  app.send(clientes)
});


app.post('/create', async (req: any, res: any) => {

  try {

    const total = await clienteModel.count()

    const anoAtual = new Date().getFullYear();
    const codCliente = `C${total + 1}/${anoAtual}`

    await clienteModel.create({ ...req.body, codCliente })

    res.status(201).send({
      message: `Cliente cadastrado com sucesso!`,
      success: true
    })

  } catch (error) {
    return res.status(500).send({
      message: 'Erro ao cadastrar Cliente! Error:' + error,
      success: false
    })
  }
})

app.post('/list', async (req: any, res: any) => {
  try {
    const { body } = req
    const { params } = body
    let clientes = []
    if (!params.filter) {
      clientes = await clienteModel.list()
    } else {
      clientes = await clienteModel.search(params.filter)
    }

    res.status(200).send({
      clientes
    })
  } catch (error) {
    return res.status(500).send({
      message: 'Erro ao buscar a lista de Cliente! ',
      success: false
    })
  }
})

module.exports = app;
