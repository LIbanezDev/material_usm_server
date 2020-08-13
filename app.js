const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const arduinoRoutes = require('./routes/arduino')
const userRoutes = require('./routes/users')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/arduino', arduinoRoutes)
app.use('/api/users', userRoutes)

const port = 4000
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})



