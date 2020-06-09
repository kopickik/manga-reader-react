// import { DateTimeResolver } from 'graphql-scalars'
// import * as Mutation from './mutation'
import _ from 'lodash'
import * as Query from './query'

const resolvers = {
  // Mutation,
  Query: Query,
  Manga: {
    lastChapterDate: (mangaObj) => new Date(mangaObj.lastChapterDate * 1000),
  },
  MangaInfo: {
    chapters: (mangaInfoObj) =>
      _.map(mangaInfoObj.chapters, (c, i) => {
        return {
          id: c[3],
          number: c[0],
          lastUpdated: c[1],
          title: c[2],
        }
      }),
  },
}

export default resolvers
