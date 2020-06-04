import Manga from '@/db/models'

const fetchOneManga = (context, args) => {
  return Manga.findById({ _id: args.id })
}

export default fetchOneManga
