const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const UnidadeModel = {

    list: async (where: any = undefined) => {
        return await prisma.unidade.findMany()
    },
    get: async (id: any) => {
        return await prisma.unidade.findFirst({
            where: { id }
        })
    },
    create: async (data: any) => {
        console.log('create models? ', data)
        await prisma.unidade.create({ data })
    },
    update: async (id: any, data: any) => {
        await prisma.unidade.update({
            where: { id },
            data
        })
    },
    delete: async (id: any) => {
        await prisma.unidade.delete({
            where: { id }
        })
    },
    createMany: async (data: any) => {
        await prisma.unidade.createMany({ data })
    },
    findFirst: async (data: any) => {
        return await prisma.unidade.findFirst({
            where: data
        })
    },
    count: async (prop: any = undefined, value: any = undefined) => {
        if (prop && value) {
            const stringWhere = `{ ${prop}: ${value}}`;
            const where = JSON.stringify(stringWhere)
            return await prisma.unidade.count({ where })
        } else {
            return await prisma.unidade.count()
        }
    },
    search: async (filter: string) => {
        return await prisma.unidade.findMany({
            where: {
                OR: [
                    { codUnidade: { contains: filter } },
                    { nomeFantasia: { contains: filter } }
                ]
            }
        })
    },
}

module.exports = UnidadeModel