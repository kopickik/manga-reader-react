import mongoose from 'mongoose'

const Schema = mongoose.Schema

const MangaSchema = new Schema({
  alias: String,
  categories: [String],
  hits: Number,
  image: String,
  lastChapterDate: Number,
  status: Number,
  title: String,
})

const Manga = mongoose.model('manga', MangaSchema)

export default Manga
