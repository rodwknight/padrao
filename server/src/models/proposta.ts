const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const PropostaModel = {

    list: async (where: any = undefined) => {
        return await prisma.proposta.findMany({
            select: {
                id: true,
                codProposta: true,
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
        return await prisma.proposta.findFirst({
            where: { id }
        })
    },
    create: async (data: any) => {
        return await prisma.proposta.create({ data })
    },
    update: async (id: string, data: any) => {

        const query = {
            where: { id },
            data
        }

        await prisma.proposta.update(query)
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
    detalhe: async (id: string) => {
        return await prisma.proposta.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                codProposta: true,
                deslocamento: true,
                funcionarios: true,
                status: true,
                valorDeslocamento: true,
                total: true,
                createdAt: true,
                propostaServicos: {
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

module.exports = PropostaModel