const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema')
const root = require('./resolvers')

const graphQlHTTP = graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
})

module.exports = graphQlHTTP

