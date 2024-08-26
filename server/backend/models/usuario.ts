import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class UsuarioModel {

    async list() {
       return await prisma.usuario.findMany()
    }

    async create(data:any) {
        await prisma.usuario.create({data})
    }

    async update(id:any, data:any) {
        await prisma.usuario.update({
            where: { id },
            data
        })
    }

    async delete(id:any) {
       await prisma.usuario.delete({
        where: {id}
       })
    }

    async createMany(data:any) {
        await prisma.usuario.createMany({data})
    }


}