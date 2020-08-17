const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');
const User = require('./class/User')

const schema = buildSchema(`
  type User {
    name: String
    age: Int
    love: [String]  
  }
  type Query {
    user(userId: Int): User
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
    user: (args) => {
        const {userId} = args;
        return new User(userId || 1)
    }
};

const graphQlHTTP = graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
})

module.exports = {
    graphQlHTTP
}
