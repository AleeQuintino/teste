// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true, trustProxy: true })

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

// Declare a route
fastify.post('/wpp/send/message', async function (request, reply) {

  // check for body
  const bodyCheck = await require('./function/check/sendMessageBody.js').execute(request)
  if (bodyCheck.code !== 200) {
    return reply.code(bodyCheck.code).send({ message: bodyCheck.message });
  }

  const [number, message] = [request.body.number, request.body.message]

  const sendMessage = await require('./function/wpp/sendMessage.js').send(number, message)

  return reply.code(sendMessage.code).send({ message: sendMessage.result });

})
// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 80, host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()

require('./wpp.js')