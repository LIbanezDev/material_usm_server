const express = require('express')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Disable express detection from lamers
app.disable('x-powered-by')

// Export io before importing routes that use it.
module.exports = {
    io,
    app
}

app.use(require('./routes'))

require('./sockets/sockets')

const port = 4000
http.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})




