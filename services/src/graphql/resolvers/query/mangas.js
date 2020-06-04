import Manga from '@/db/models'

const fetchAllMangas = () => {
  return Manga.find({}).sort({ lastChapterDate: 'desc' })
}

export default fetchAllMangas
