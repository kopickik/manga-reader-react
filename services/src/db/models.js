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

const MangaInfoSchema = new Schema({
  aka: [String],
  alias: String,
  artist: String,
  artist_kw: [String],
  author: String,
  author_kw: [String],
  categories: [String],
  chapters: [Array],
  chapters_len: Number,
  created: Number,
  description: String,
  hits: Number,
  image: String,
  language: Number,
  last_chapter_date: Number,
  released: Number,
  startsWith: String,
  title: String,
  title_kw: [String],
  type: Number,
  updatedKeywords: Boolean,
  url: String,
})

const Manga = mongoose.model('manga', MangaSchema)
const MangaInfo = mongoose.model('mangaInfo', MangaInfoSchema)

export { Manga, MangaInfo }
