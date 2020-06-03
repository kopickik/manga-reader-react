import Manga from '@/db/models'

const mangaResolver = (context, args) => {
  return Manga.findById({ _id: args.id })
}

export default mangaResolver
