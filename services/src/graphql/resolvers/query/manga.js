import mongoose from 'mongoose'
import MangasSvcAdapter from '@/adapters/mangas.svc.adapter'

const mangaResolver = async (err, args) => {
  if (err || !args.id) return
  const theId = mongoose.Types.ObjectId(args.id)
  if (!mongoose.isValidObjectId(theId)) return new Error(`Invalid ObjectId: ${args}`)
  try {
    return await MangasSvcAdapter.fetchMangaById({ _id: theId })
  } catch (e) {
    console.error(e)
    //
  }
}

export default mangaResolver
