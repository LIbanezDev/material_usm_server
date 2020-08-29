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


app.use('/graphql', require('./graphql/graphql'))

app.use('/api/file', require('./routes/file.routes'))
app.use('/api/user', require('./routes/user.routes'))
app.use('/api/career', require('./routes/career.routes'))
app.use('/api/subject', require('./routes/subject.routes'))

// Export app for testing
module.exports = {
    app,
    io
}

require('./sockets/sockets')

module.exports = {
    http
}







