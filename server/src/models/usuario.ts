const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const UsuarioModel = {

    list: async () => {
       return await prisma.usuario.findMany()
    },
    get: async (username:any, password:any) => {
        return await prisma.usuario.findFirst({
            where: { username, password }
        })
    },
    create: async (data:any) => {
        await prisma.usuario.create({data})
    },
    update: async (id:any, data:any) => {
        await prisma.usuario.update({
            where: { id },
            data
        })
    },
    delete: async (id:any) => {
       await prisma.usuario.delete({
        where: {id}
       })
    },
    createMany: async (data:any) => {
        await prisma.usuario.createMany({data})
    },
    findFirst: async (data:any) => {
        return await prisma.usuario.findFirst({
            where: data
        })
    }
}

module.exports = UsuarioModel