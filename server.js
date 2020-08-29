const {http} = require('./app')

const port = process.env.PORT || 4000
http.listen(port, () => {
    console.log(`Listening at port ${port}`)
})
