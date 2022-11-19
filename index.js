// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true, trustProxy: true })

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

// Declare a route
fastify.post('/wpp/send/message', async function (request, reply) {

  // check for basic auth header
  const authCheck = await require('./fc/check/auth.js').execute(request)
  if (authCheck.code !== 200) {
    return reply.code(authCheck.code).send({ message: authCheck.message });
  }

  // check for body
  const bodyCheck = await require('./fc/check/sendMessageBody.js').execute(request)
  if (bodyCheck.code !== 200) {
    return reply.code(bodyCheck.code).send({ message: bodyCheck.message });
  }

  // const base64Credentials = request.headers.authorization.split(' ')[1];
  // const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  // const [username, password] = credentials.split(':');

  // // check for username and pasword
  // const login = await require('./fc/firebase/auth.js').signInWithEmail(username, password)

  // console.log(login)

  // if (login.code !== 200) {
  //   return reply.code(401).send({ message: 'Invalid Authentication Credentials' });
  // }

  const [number, message] = [request.body.number, request.body.message]

  const sendMessage = await require('./fc/wpp/sendMessage.js').send(number, message)

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