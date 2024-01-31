const createServer = require('./server')
// testing commit
const init = async () => {
  try {
    const server = await createServer()
    await server.start()
    console.log(`Server running at: ${server.info.uri}`)
  } catch (err) {
    console.error('Error starting server', err)
    process.exit(1)
  }
}

init()
