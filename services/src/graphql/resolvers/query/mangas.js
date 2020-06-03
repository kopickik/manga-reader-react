import Manga from '@/db/models'
import _merge from 'lodash/merge'

const mangasResolver = () => {
  return Manga.find({}).sort({ lastChapterDate: 'desc' })
}

export default mangasResolver
