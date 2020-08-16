const express = require('express')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const bodyParser = require('body-parser')
const cors = require('cors')

// Disable express detection from lamers
app.disable('x-powered-by')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

app.use(cors())

const userRoutes = require('./routes/users.routes')
const fileRoutes = require('./routes/files.routes')

app.use('/api/file', fileRoutes)
app.use('/api/user', userRoutes)

// Export app for testing
module.exports = {
    app,
    http,
    io
}

require('./sockets/sockets')







