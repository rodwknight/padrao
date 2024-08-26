import { UsuarioModel } from '../../models/usuario'

const usuariosModal = new UsuarioModel()

module.exports = async function (fastify:any, opts:any) {
  fastify.get('/', async function (request:any, reply:any) {
    const usuarios = await usuariosModal.list()
    return usuarios
  })
}