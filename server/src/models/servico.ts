const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const ServicoModel = {

    list: async (where: any = undefined) => {
        return await prisma.servico.findMany()
    },
    get: async (id: any) => {
        return await prisma.servico.findFirst({
            where: { id }
        })
    },
    create: async (data: any) => {
        await prisma.servico.create({ data })
    },
    update: async (id: any, data: any) => {
        await prisma.servico.update({
            where: { id },
            data
        })
    },
    delete: async (id: any) => {
        await prisma.servico.delete({
            where: { id }
        })
    },
    createMany: async (data: any) => {
        await prisma.servico.createMany({ data })
    },
    findFirst: async (data: any) => {
        return await prisma.servico.findFirst({
            where: data
        })
    },
    count: async (prop: any = undefined, value: any = undefined) => {
        if (prop && value) {
            const stringWhere = `{ ${prop}: ${value}}`;
            const where = JSON.stringify(stringWhere)
            return await prisma.servico.count({ where })
        } else {
            return await prisma.servico.count()
        }
    },
    search: async (filter: string) => {
        return await prisma.servico.findMany({
            where: {
                OR: [
                    { codServico: { contains: filter } },
                    { nome: { contains: filter } }
                ]
            }
        })
    },
}

module.exports = ServicoModel