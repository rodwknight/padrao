const contratoModel = require('../models/contrato')

const getContratos = async (req: any, res: any): Promise<any> => {
    try {
        const contratos = await contratoModel.list()
        res.status(200).send({ contratos })
    } catch (error) {
        res.status(500).send({
            message: 'Erro ao listar Contratos' + error,
            success: false
        })
    }
};

const getListContratos = async (req: any, res: any): Promise<any> => {
    try {
        const { body } = req
        const { params } = body
        let contratos = []
        if (!params.filter) {
            contratos = await contratoModel.list()
        } else {
            contratos = await contratoModel.search(params.filter)
        }

        res.status(200).send({
            contratos
        })
    } catch (error) {
        res.status(500).send({
            message: 'Erro ao buscar a lista de Proposta! Error: ' + error,
            success: false
        })
    }
}

const getContratoDetail = async (req: any, res: any): Promise<any> => {
    try {

        const { body } = req
        const { params } = body

        const contrato = await contratoModel.detalhe(params.id)

        res.status(200).send({
            contrato
        })
    } catch (error) {
        res.status(500).send({
            message: 'Erro ao buscar a Detalhe do Contrato! Error: ' + error,
            success: false
        })
    }
}

const updateContrato = async (req: any, res: any) => {
    try {

        const { id, status } = req.body


        await contratoModel.update(id, { status })

        const contratos = await contratoModel.list()

        res.status(200).send({
            contratos,
            success: true
        })

    } catch (error) {
        res.status(500).send({
            message: 'Erro ao tentar alterar a Contrato! Error: ' + error,
            success: false
        })
    }
}

module.exports = {
    getContratos,
    getListContratos,
    getContratoDetail,
    updateContrato
};

