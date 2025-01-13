const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const PropostaServicoModel = {

    list: async (where: any = undefined) => {
        return await prisma.propostaServico.findMany()
    },
    get: async (id: any) => {
        return await prisma.propostaServico.findFirst({
            where: { id }
        })
    },
    create: async (data: any) => {
        return await prisma.propostaServico.create({ data })
    },
    update: async (id: any, data: any) => {
        await prisma.propostaServico.update({
            where: { id },
            data
        })
    },
    delete: async (id: any) => {
        await prisma.propostaServico.delete({
            where: { id }
        })
    },
    createMany: async (data: any) => {
        await prisma.propostaServico.createMany({ data })
    },
    findFirst: async (data: any) => {
        return await prisma.propostaServico.findFirst({
            where: data
        })
    },
    count: async (prop: any = undefined, value: any = undefined) => {
        if (prop && value) {
            const stringWhere = `{ ${prop}: ${value}}`;
            const where = JSON.stringify(stringWhere)
            return await prisma.propostaServico.count({ where })
        } else {
            return await prisma.propostaServico.count()
        }
    },
    search: async (filter: string) => {
        return await prisma.propostaServico.findMany({
            where: {
                OR: [
                    { codProposta: { contains: filter } }
                ]
            }
        })
    },
}

module.exports = PropostaServicoModel