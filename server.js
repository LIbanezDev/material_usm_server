const {http} = require('./app')

const port = 4000
http.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
