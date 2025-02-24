const propostaModel = require('../models/proposta')
const servicoModel = require('../models/servico')
const contratoModel = require('../models/contrato')
const ordemModel = require('../models/ordem')

// Retorna todos as servicos
const getServicos = async (req: any, res: any): Promise<any> => {
    try {
        const servicos = await propostaModel.list()
        res.status(200).send({ servicos })
    } catch (error) {
        res.status(500).send({
            message: 'Erro ao listar Servicos' + error,
            success: false
        })
    }
};

const getServicoDetail = async (req: any, res: any): Promise<any> => {
    try {

        const { body } = req
        const { params } = body

        const proposta = await propostaModel.detalhe(params.id)

        res.status(200).send({
            proposta
        })
    } catch (error) {
        res.status(500).send({
            message: 'Erro ao buscar a Detalhe da Proposta! Error: ' + error,
            success: false
        })
    }
}

const createServico = async (req: any, res: any) => {

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
}

const updateServico = async (req: any, res: any) => {
    try {

        const { id, status } = req.body
        const now = new Date();
        const countOrdem = await ordemModel.count()
        const anoAtual = new Date().getFullYear();

        const proposta = await propostaModel.get(id)

        let query: any

        if (status === 2) {

            query = {
                status,
                contrato: {
                    update: {
                        dataFinal: new Date(now.setFullYear(now.getFullYear() + 1)),
                        status,
                        ordem: {
                            create: {
                                codOrdem: `O${countOrdem + 1}/${anoAtual}`,
                                funcionarios: proposta.funcionarios,
                                deslocamento: proposta.deslocamento,
                                valorDeslocamento: proposta.valorDeslocamento,
                                total: proposta.total,
                                ordemServicos: {
                                    create: proposta.propostaServicos.map((ps: any) => ({
                                        idServico: ps.servicos.id,
                                        valor: ps.valor,
                                    }))
                                },
                                idCliente: proposta.cliente.id,
                                idUnidade: proposta.unidade.id,
                                idUsuario: proposta.usuario.id
                            }
                        }
                    }
                }
            }
        } else if (status === 3) {
            query = {
                status,
                contrato: {
                    update: {
                        dataFinal: new Date(now),
                        status,
                    }
                }
            }
        }

        await propostaModel.update(id, query)

        const propostas = await propostaModel.list()

        res.status(200).send({
            propostas,
            success: true
        })

    } catch (error) {
        res.status(500).send({
            message: 'Erro ao tentar alterar a Proposta! Error: ' + error,
            success: false
        })
    }
}

const getListServicos = async (req: any, res: any): Promise<any> => {
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
}

module.exports = {
    getServicos,
    getServicoDetail,
    createServico,
    updateServico,
    getListServicos
};

