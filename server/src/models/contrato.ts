import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const ContratoModel = {

    list: async () => {
        return await prisma.contrato.findMany({
            select: {
                id: true,
                codContrato: true,
                propostas: {
                    take: 1, 
                    orderBy: { createdAt: 'desc' },
                    select: {
                        unidade: {
                            select: {
                                codUnidade: true,
                                nomeFantasia: true
                            }
                        },
                        cliente: {
                            select: {
                                id: true,
                                codCliente: true,
                                nomeFantasia: true
                            }
                        },
                        usuario: {
                            select: {
                                nome: true
                            },
                        },
                    }
                },
                status: true,
                createdAt: true
            }
        })
    },
    create: async (data: any) => {
        await prisma.contrato.create({ data })
    },
    update: async (id: any, data: any) => {
        await prisma.contrato.update({
            where: { id },
            data
        })
    },
    delete: async (id: any) => {
        await prisma.contrato.delete({
            where: { id }
        })
    },
    createMany: async (data: any) => {
        await prisma.contrato.createMany({ data })
    },
    search: async (filter: string) => {
        return await prisma.contrato.findMany({
            where: {
                OR: [
                    { codContrato: { contains: filter } }
                ]
            }
        })
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