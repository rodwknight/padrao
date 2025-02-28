import { Ordem } from "../interfaces/ordem";

const ordemModel = require('../models/ordem')


// Retorna todos as ordens
const getOrdens = async (req: any, res: any): Promise<any> => {
    try {
        const {
            id,
            codOrdem,
            status,
            createdAt,
            unidade: {
                codUnidade,
                nomeFantasia: nomeUnidade
            },
            cliente: {
                codCliente,
                nomeFantasia: nomeCliente
            },
            usuario: {
                nome: nomeUsuario
            }
        } = await ordemModel.list()

        const ordens = {
            id,
            codOrdem,
            status,
            codUnidade,
            nomeUnidade,
            codCliente,
            nomeCliente,
            nomeUsuario,
            createdAt
        }

        res.status(200).send({ ordens })
    } catch (error) {
        res.status(500).send({
            message: 'Erro ao listar Ordens' + error,
            success: false
        })
    }
};

const getOrdensSearch = async (req: any, res: any): Promise<any> => {
    try {
        const { body } = req
        const { params } = body

        let ordens

        if (params.filter) {
            ordens = await ordemModel.search(params.filter)

        } else {
            ordens = await ordemModel.list()
        }

        res.status(200).send({ ordens })

    } catch (error) {
        return res.status(500).send({
            message: 'Erro ao buscar a lista de Ordens! Error: ' + error,
            success: false
        })
    }
};

const getOrdemDetail = async (req: any, res: any): Promise<any> => {
    try {

        const { body } = req
        const { params } = body

        const ordem = await ordemModel.detalhe(params.id)

        res.status(200).send({
            ordem
        })
    } catch (error) {
        res.status(500).send({
            message: 'Erro ao buscar a Detalhe da Ordem! Error: ' + error,
            success: false
        })
    }
}

const updateOrdem = async (req: any, res: any) => {
    try {

        let data: Ordem
        const { id, status } = req.body

        data = { status }
        if (status === 3 || status === 4) {
            data.dataFinal = new Date()
        } else if (status == 2) {
            data.dataInicial = new Date()
        }

        await ordemModel.update(id, data)

        const ordens = await ordemModel.list()

        res.status(200).send({
            ordens,
            success: true
        })
    }
    catch (error) {
        res.status(500).send({
            message: 'Erro ao tentar alterar a Ordem! Error: ' + error,
            success: false
        })
    }

}

const createOrdem = async (req: any, res: any) => {

    try {

        const { idCliente, idUnidade, funcionarios, deslocamento, valorDeslocamento, servicos, idUsuario, total } = req.body
        const count = await ordemModel.count()
        const anoAtual = new Date().getFullYear();

        const data = {
            funcionarios,
            deslocamento,
            valorDeslocamento: valorDeslocamento ? valorDeslocamento : 0,
            total,
            codOrdem: `O${count + 1}/${anoAtual}`,
            ordemServicos: {
                create: servicos.map((servico: any) => ({
                    idServico: servico.id,
                    valor: servico.valor,
                }))
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

        const ordem = await ordemModel.create(data)

        res.status(201).send({
            message: `Ordem cadastrado com sucesso!`,
            ordem,
            success: true
        })

    } catch (error) {
        res.status(500).send({
            message: 'Erro ao cadastrar Ordem! Error: ' + error,
            success: false
        })
    }
}

module.exports = {
    getOrdens,
    getOrdensSearch,
    getOrdemDetail,
    updateOrdem,
    createOrdem
};
