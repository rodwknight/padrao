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

module.exports = {
    getOrdens,
    getOrdensSearch
};
