const empresaModel = require('../models/empresa')

// Retorna todos as servicos
const getEmpresas = async (req: any, res: any): Promise<any> => {
    try {
        const empresas = await empresaModel.list()
        res.status(200).send({ empresas })
    } catch (error) {
        res.status(500).send({
            message: 'Erro ao listar Empresas' + error,
            success: false
        })
    }
};


module.exports = {
    getEmpresas
};

