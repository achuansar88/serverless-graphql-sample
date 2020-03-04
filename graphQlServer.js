// eslint-disable-next-line import/prefer-default-export
import { ApolloServer, gql } from 'apollo-server-lambda';
const ApolloServerLambda = require('apollo-server-lambda').ApolloServer;

// import Models and connect to postgressdatabase
import Models from './models/models';

//import user schema 
import User from './models/user';

// graphQL schema which is a collection of type definitions
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  # This "User" type defines the queryable fields for every user in our data source.

  type User {
    user_id: Int
    phone: String
    email: String,
    user_name: String,
    signup_status: Boolean
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "users" query returns an array of zero or more Users (defined above).
  # hello returns string 
  #userById returns user which matches the id provided

  type Query {
    hello:  String
    users:  [User]
    userById (user_id: Int):  [User]
  }

  # mutation type modify data in the data source, it can be used to insert ,update or delete data
  # addUser insert user data in "user" table, we can have multiple mutations

  type Mutation {
    addUser(user_name: String, phone: String, email: String, signup_status: Boolean): User    
  }
`;


// Resolvers define the technique for fetching the types defined in the schema

const resolvers = {
  
  Query: {
      hello: () => "world",
      users: () => User.findAll(),
      userById: (_,{user_id})  => User.findAll({where:{user_id : user_id }})
  },

  Mutation: {
      // insert user data
      addUser: async (_, { signup_status, phone, user_name,email }) => {
          try {
              const user = await User.create({
                user_name: user_name,
                  phone: phone,
                  user_name: user_name,
                  email:email,
                  signup_status: signup_status
              });

              return user;
          } catch (e) {
              console.log(e);
              throw new Error(e);
          }
      },
     
  }
};

//initialize and start Appolo server by passing type definitions and resolvers
const server = new ApolloServerLambda({ typeDefs, resolvers ,context: ({ event, context }) => ({
  headers: event.headers,
  functionName: context.functionName,
  event,
  context,
})});

export const graphQlServer = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization'
  },
});
