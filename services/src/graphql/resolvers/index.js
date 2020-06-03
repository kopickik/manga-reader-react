// import { DateTimeResolver } from 'graphql-scalars'
// import * as Mutation from './mutation'
import * as Query from './query'

const resolvers = {
  // Mutation,
  Query: Query,
  Manga: {
    lastChapterDate: (mangaObj) => new Date(mangaObj.lastChapterDate * 1000),
  },
  // DateTime: DateTimeResolver,
}

export default resolvers
