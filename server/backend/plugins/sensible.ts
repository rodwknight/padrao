import fastifyPlugin from "fastify-plugin"

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fastifyPlugin(async function (fastify:any, opts:any) {
  fastify.register(require('@fastify/sensible'), {
    errorHandler: false
  })
})
