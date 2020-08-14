const express = require('express')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors')
app.use(cors())
const bodyParser = require('body-parser')

// General config file uploads
const multer = require('multer')
const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
        // no larger than 5mb.
        fileSize: 5 * 1024 * 1024,
    },
});
app.disable('x-powered-by')
app.use(multerMid.single('archivo_exe'))

// Export io before importing routes that use it.
module.exports = io

require('./sockets/sockets')
const userRoutes = require('./routes/users.routes')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

app.use('/api/users', userRoutes)

const port = 4000
http.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})




