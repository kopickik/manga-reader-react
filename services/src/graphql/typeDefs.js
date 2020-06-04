import { gql } from 'apollo-server'

const typeDefs = gql`
  scalar Date

  type Manga {
    id: ID!
    title: String!
    image: String
    lastChapterDate: Date
    info: MangaInfo
  }

  type MangaInfo {
    id: ID!
    chapters: [Chapter!]!
    description: Text
  }

  type Chapter {
    number: Number
    id: ID!
    lastUpdated: Date
    title: String
  }

  type Mutation {
    deleteManga(mangaId: ID!): ServerMessage
  }

  type Query {
    mangas: [Manga!]!
    manga(id: ID!): Manga!
  }

  type ServerMessage {
    message: String
  }
`

export default typeDefs
