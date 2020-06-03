import { gql } from 'apollo-server'

const typeDefs = gql`
  scalar Date

  type Manga {
    id: ID!
    title: String!
    image: String
    lastChapterDate: Date
  }

  type Mutation {
    deleteManga(mangaId: ID!): ServerMessage
  }

  type Query {
    mangas: [Manga!]!
  }

  type ServerMessage {
    message: String
  }
`

export default typeDefs
