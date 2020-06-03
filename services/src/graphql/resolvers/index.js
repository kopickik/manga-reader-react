// import { DateTimeResolver } from 'graphql-scalars'
// import * as Mutation from './mutation'
import * as Query from './query'

const resolvers = {
  // Mutation,
  Query: Query,
  Manga: {
    lastChapterDate: (mangaObj) => new Date(mangaObj.lastChapterDate * 1000),
    info: (mangaObj) => {
      return {
        chapters: [
          { id: mangaObj.id, lastUpdated: new Date(), number: 1, title: 'Chapter 1' },
          { id: 2, lastUpdated: new Date(), number: 2, title: 'Chapter 2' },
        ],
      }
    },
  },
  // DateTime: DateTimeResolver,
}

export default resolvers
