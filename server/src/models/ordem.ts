const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const OrdemModel = {

    list: async () => {
        return await prisma.ordem.findMany({
            select: {
                id: true,
                codOrdem: true,
                cliente: {
                    select: {
                        codCliente: true,
                        nomeFantasia: true
                    }
                },
                unidade: {
                    select: {
                        codUnidade: true,
                        nomeFantasia: true
                    }
                },
                usuario: {
                    select: {
                        nome: true
                    },
                },
                status: true,
                createdAt: true
            }
        })
    },
    get: async (id: any) => {
        return await prisma.ordem.findFirst({
            where: { id }
        })
    },
    create: async (data: any) => {
        return await prisma.ordem.create({ data })
    },
    update: async (id: string, data: any) => {

        const query = {
            where: { id },
            data
        }

        await prisma.ordem.update(query)
    },
    delete: async (id: any) => {
        await prisma.ordem.delete({
            where: { id }
        })
    },
    createMany: async (data: any) => {
        await prisma.ordem.createMany({ data })
    },
    findFirst: async (data: any) => {
        return await prisma.ordem.findFirst({
            where: data
        })
    },
    count: async (prop: any = undefined, value: any = undefined) => {
        if (prop && value) {
            const stringWhere = `{ ${prop}: ${value}}`;
            const where = JSON.stringify(stringWhere)
            return await prisma.ordem.count({ where })
        } else {
            return await prisma.ordem.count()
        }
    },
    search: async (filter: string) => {
        return await prisma.ordem.findMany({
            where: {
                OR: [
                    { codOrdem: { contains: filter } }
                ]
            },
            select: {
                id: true,
                codOrdem: true,
                cliente: {
                    select: {
                        codCliente: true,
                        nomeFantasia: true
                    }
                },
                unidade: {
                    select: {
                        codUnidade: true,
                        nomeFantasia: true
                    }
                },
                usuario: {
                    select: {
                        nome: true
                    },
                },
                status: true,
                createdAt: true
            }
        })
    },
    detalhe: async (id: string) => {
        return await prisma.ordem.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                codOrdem: true,
                deslocamento: true,
                funcionarios: true,
                status: true,
                valorDeslocamento: true,
                total: true,
                createdAt: true,
                ordemServicos: {
                    select: {
                        valor: true,
                        servicos: {
                            select: {
                                codServico: true,
                                descricao: true,
                                nome: true,
                            }
                        }
                    }
                },
                unidade: {
                    select: {
                        codUnidade: true,
                        nomeFantasia: true
                    }
                },
                cliente: {
                    select: {
                        codCliente: true,
                        nomeFantasia: true
                    }
                },
                usuario: {
                    select: {
                        nome: true
                    }
                }

            }
        })
    }
}

module.exports = OrdemModel