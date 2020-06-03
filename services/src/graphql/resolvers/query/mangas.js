import Manga from '@/db/models'

const mangasResolver = () => {
  return Manga.find({}).sort({ lastChapterDate: 'desc' })
}

export default mangasResolver
