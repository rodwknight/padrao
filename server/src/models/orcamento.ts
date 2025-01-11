const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const OrcamentoModel = {

    list: async (where: any = undefined) => {
        return await prisma.orcamento.findMany()
    },
    get: async (id: any) => {
        return await prisma.orcamento.findFirst({
            where: { id }
        })
    },
    create: async (data: any) => {
        await prisma.orcamento.create({ data })
    },
    update: async (id: any, data: any) => {
        await prisma.orcamento.update({
            where: { id },
            data
        })
    },
    delete: async (id: any) => {
        await prisma.orcamento.delete({
            where: { id }
        })
    },
    createMany: async (data: any) => {
        await prisma.orcamento.createMany({ data })
    },
    findFirst: async (data: any) => {
        return await prisma.orcamento.findFirst({
            where: data
        })
    },
    count: async (prop: any = undefined, value: any = undefined) => {
        if (prop && value) {
            const stringWhere = `{ ${prop}: ${value}}`;
            const where = JSON.stringify(stringWhere)
            return await prisma.orcamento.count({ where })
        } else {
            return await prisma.orcamento.count()
        }
    },
    search: async (filter: string) => {
        return await prisma.orcamento.findMany({
            where: {
                OR: [
                    { codOrcamento: { contains: filter } }
                ]
            }
        })
    },
}

module.exports = OrcamentoModel