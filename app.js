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

const userRoutes = require('./routes/user.routes')
const fileRoutes = require('./routes/file.routes')
const careerRoutes = require('./routes/career.routes')
const subjectRoutes = require('./routes/subject.routes')
const {graphQlHTTP} = require('./graphql/graphql')

// Testing graphql
app.use('/graphql', graphQlHTTP)

app.use('/api/file', fileRoutes)
app.use('/api/user', userRoutes)
app.use('/api/career', careerRoutes)
app.use('/api/subject', subjectRoutes)

// Export app for testing
module.exports = {
    app,
    http,
    io
}

require('./sockets/sockets')







