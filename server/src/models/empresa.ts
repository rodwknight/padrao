import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export class EmpresaModel {

    async list() {
       return await prisma.empresa.findMany()
    }

    async create(data:any) {
        await prisma.empresa.create({data})
    }

    async update(id:any, data:any) {
        await prisma.empresa.update({
            where: { id },
            data
        })
    }

    async delete(id:any) {
       await prisma.empresa.delete({
        where: {id}
       })
    }

    async createMany(data:any) {
        await prisma.empresa.createMany({data})
    }


}