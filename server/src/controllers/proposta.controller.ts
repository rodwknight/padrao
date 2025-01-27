const propostaModel = require('../models/proposta')
const servicoModel = require('../models/servico')
const contratoModel = require('../models/contrato')

// Retorna todos as propostas
const getPropostas = async (req: any, res: any): Promise<any> => {
    try {
        const propostas = await propostaModel.list()
        res.status(200).send({ propostas })
    } catch (error) {
        res.status(500).send({
            message: 'Erro ao listar Propostas' + error,
            success: false
        })
    }
};

const getPropostaDetail = async (req: any, res: any): Promise<any> => {
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

const createProposta = async (req: any, res: any) => {

    try {

        const { idCliente, idUnidade, funcionarios, deslocamento, valorDeslocamento, servicos, idUsuario, total } = req.body
        const count = await propostaModel.count()
        const anoAtual = new Date().getFullYear();
        const now = new Date();

        const countContrato = await contratoModel.count()

        const data = {
            funcionarios,
            deslocamento,
            valorDeslocamento: valorDeslocamento ? valorDeslocamento : 0,
            total,
            codProposta: `P${count + 1}/${anoAtual}`,
            propostaServicos: {
                create: servicos.map((servico: any) => ({
                    idServico: servico.id,
                    valor: servico.valor,
                }))
            },
            contrato: {
                create: {
                    codContrato: `C${countContrato + 1}/${anoAtual}`,
                    dataFinal: new Date(now.setFullYear(now.getFullYear() + 1)) // Esse aqui vai mudar
                }
            },
            cliente: {
                connect: { id: idCliente }
            },
            unidade: {
                connect: { id: idUnidade }
            },
            usuario: {
                connect: { id: idUsuario }
            }
        }

        const proposta = await propostaModel.create(data)

        for (let servico of servicos) {
            await servicoModel.update(servico.id, { valor: servico.valor })
        }

        res.status(201).send({
            message: `Proposta cadastrado com sucesso!`,
            proposta,
            success: true
        })

    } catch (error) {
        res.status(500).send({
            message: 'Erro ao cadastrar Proposta! Error: ' + error,
            success: false
        })
    }
}

const updateProposta = async (req: any, res: any) => {
    try {

        const { id, status } = req.body
        const now = new Date();

        let query: any

        if (status == 2) {
            query = {
                status,
                contrato: {
                    update: {
                        dataFinal: new Date(now.setFullYear(now.getFullYear() + 1)),
                        status
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

module.exports = {
    getPropostas,
    getPropostaDetail,
    createProposta,
    updateProposta
};