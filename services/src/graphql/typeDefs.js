import { gql } from 'apollo-server'

const typeDefs = gql`
  scalar Date

  type Listing {
    description: String!
    id: ID!
    title: String!
  }

  type User {
    email: String!
    id: ID!
  }

  type UserSession {
    createdAt: Date!
    expiresAt: Date!
    id: ID!
    user: User!
  }

  type Mutation {
    createUser(email: String!, password: String!): User!
    createUserSession(email: String!, password: String!): UserSession!
    deleteUserSession(sessionId: ID!): Boolean!
    createListing(description: String!, title: String!): Listing!
    deleteListing(listingId: ID!): ServerMessage
  }

  type Query {
    listings: [Listing!]!
    userSession(me: Boolean!): UserSession
  }

  type ServerMessage {
    message: String
  }
`

export default typeDefs
