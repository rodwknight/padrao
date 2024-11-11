const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const ClienteModel = {

    list: async (where: any = undefined) => {
        return await prisma.cliente.findMany()
    },
    get: async (id: any) => {
        return await prisma.cliente.findFirst({
            where: { id }
        })
    },
    create: async (data: any) => {
        console.log('create models? ', data)
        await prisma.cliente.create({ data })
    },
    update: async (id: any, data: any) => {
        await prisma.cliente.update({
            where: { id },
            data
        })
    },
    delete: async (id: any) => {
        await prisma.cliente.delete({
            where: { id }
        })
    },
    createMany: async (data: any) => {
        await prisma.cliente.createMany({ data })
    },
    findFirst: async (data: any) => {
        return await prisma.cliente.findFirst({
            where: data
        })
    },
    count: async (prop: any = undefined, value: any = undefined) => {
        if (prop && value) {
            const stringWhere = `{ ${prop}: ${value}}`;
            const where = JSON.stringify(stringWhere)
            return await prisma.cliente.count({ where })
        } else {
            return await prisma.cliente.count()
        }
    },
    search: async (filter: string) => {
        return await prisma.cliente.findMany({
            where: {
                OR: [
                    { codCliente: { contains: filter } },
                    { nomeFantasia: { contains: filter } }
                ]
            }
        })
    },
}

module.exports = ClienteModel