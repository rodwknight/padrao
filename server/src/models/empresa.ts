const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()
const EmpresaModel = {

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
    findFirst: async (where: any) => {
        return await prisma.empresa.findFirst({ where })
    },
    exist: async (equals: string) => {

        const where = {
            nome: {
                equals,
                mode: 'insensitive'
            }
        }

        console.log('where? ', { where })

        return await prisma.empresa.findFirst({ where })
    }


}

module.exports = EmpresaModel