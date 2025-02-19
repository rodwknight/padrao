const ordemModel = require('../models/ordem')


// Retorna todos as ordens
const getOrdens = async (req: any, res: any): Promise<any> => {
    try {
        const ordens = await ordemModel.list()
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
        let ordens = []
        if (!params.filter) {
            ordens = await ordemModel.list()
        } else {
            ordens = await ordemModel.search(params.filter)
        }

        res.status(200).send({
            ordens
        })
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
