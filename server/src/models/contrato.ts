import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const ContratoModel = {

    list: async () => {
        return await prisma.empresa.findMany()
    },
    create: async (data: any) => {
        await prisma.empresa.create({ data })
    },
    update: async (id: any, data: any) => {
        await prisma.empresa.update({
            where: { id },
            data
        })
    },
    delete: async (id: any) => {
        await prisma.empresa.delete({
            where: { id }
        })
    },
    createMany: async (data: any) => {
        await prisma.empresa.createMany({ data })
    },
    count: async (prop: any = undefined, value: any = undefined) => {
        if (prop && value) {
            const stringWhere = `{ ${prop}: ${value}}`;
            const where = JSON.parse(stringWhere)
            return await prisma.contrato.count({ where })
        } else {
            return await prisma.contrato.count()
        }
    }
}

module.exports = ContratoModel