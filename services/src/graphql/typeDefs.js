import { gql } from 'apollo-server'

const typeDefs = gql`
  scalar Date

  type Manga {
    id: ID!
    categories: [String]
    alias: String
    hits: Int
    title: String!
    image: String
    lastChapterDate: Date
    info: MangaInfo!
  }

  type MangaInfo {
    id: ID
    aka: [String]
    chapters: [Chapter]
    description: String
    title: String
    url: String
    image: String
  }

  type Chapter {
    number: Float
    id: String
    lastUpdated: Date
    title: String
  }

  type Mutation {
    deleteManga(mangaId: ID!): ServerMessage
  }

  type Query {
    mangas: [Manga!]!
    manga(id: ID!): Manga!
    chapters: [Chapter!]!
  }

  type ServerMessage {
    message: String
  }
`

export default typeDefs
