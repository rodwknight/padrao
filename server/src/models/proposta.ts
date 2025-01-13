const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const PropostaModel = {

    list: async (where: any = undefined) => {
        return await prisma.proposta.findMany()
    },
    get: async (id: any) => {
        return await prisma.proposta.findFirst({
            where: { id }
        })
    },
    create: async (data: any) => {
        return await prisma.proposta.create({ data })
    },
    update: async (id: any, data: any) => {
        await prisma.proposta.update({
            where: { id },
            data
        })
    },
    delete: async (id: any) => {
        await prisma.proposta.delete({
            where: { id }
        })
    },
    createMany: async (data: any) => {
        await prisma.proposta.createMany({ data })
    },
    findFirst: async (data: any) => {
        return await prisma.proposta.findFirst({
            where: data
        })
    },
    count: async (prop: any = undefined, value: any = undefined) => {
        if (prop && value) {
            const stringWhere = `{ ${prop}: ${value}}`;
            const where = JSON.stringify(stringWhere)
            return await prisma.proposta.count({ where })
        } else {
            return await prisma.proposta.count()
        }
    },
    search: async (filter: string) => {
        return await prisma.proposta.findMany({
            where: {
                OR: [
                    { codProposta: { contains: filter } }
                ]
            }
        })
    },
}

module.exports = PropostaModel