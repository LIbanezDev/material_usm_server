const {buildSchema} = require('graphql');

module.exports = buildSchema(`
  type Career {
    id: ID
    name: String
    type: String
  }
  
  type File {
    id: ID
    url: String
    name: String
    extension: String
    subjectId: Int
    createdAt: String
    updatedAt: String
    createdAtFormated: String
    Subject: Subject
  }
  
  type Subject {
    id: ID
    name: String
    semester: Int
    careerId: Int
    Career: Career
  }
  
  type User {
    id: ID
    name: String
    username: String
    age: Int
    image: String
    Career: Career
  }
  
  type Error {
    code: Int
    message: String
  }
  
  type Register {
    User: User
    Error: Error
  }
  
  type Query {
    subjects(ID: Int, careerId: Int, semester: Int): [Subject]
    careers(ID: Int, type: String): [Career]
    files(ID: Int, subjectId: Int, limit: Int, offset: Int, careerId: Int, semester: Int, careerType: String): [File]
  }
 
  type Mutation {
    registerUser(name: String!, username: String!, age: Int!, password: String!, careerId: Int): Register
  }
`);
