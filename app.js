const express = require('express')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const cors = require('cors')
app.use(cors())
const bodyParser = require('body-parser')

// Export io before importing routes, otherwise this shit doesn't works
module.exports = io

require('./sockets/sockets')
const arduinoRoutes = require('./routes/arduino')
const userRoutes = require('./routes/users')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())


app.use('/arduino', arduinoRoutes)
app.use('/api/users', userRoutes)

const port = 4000
http.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})




