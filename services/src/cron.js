import 'dotenv/config'
import axios from 'axios'
import cron from 'node-cron'
import _ from 'lodash'
const { ConcurrencyManager } = require('axios-concurrency')
import { Manga, MangaInfo } from '@/db/models'
import '@/db/connection'

const axiosME = axios.create({
  baseURL: process.env.MANGA_URL,
})

const axiosMI = axios.create({
  baseURL: process.env.MANGA_INFO_URL,
})

const MAX_CONCURRENT_REQUESTS = 2

const manager = ConcurrencyManager(axiosMI, MAX_CONCURRENT_REQUESTS)

const transformSummaryResponse = (manga) =>
  manga.map(
    ({
      a: alias,
      c: categories,
      h: hits,
      i: _id,
      im: image,
      ld: lastChapterDate,
      s: status,
      t: title,
    }) => ({
      _id,
      alias,
      categories,
      hits,
      image,
      lastChapterDate,
      status,
      title,
    })
  )

const transformSingleMangaResponse = (mangaObj) => new MangaInfo(mangaObj)

const seed = async () => {
  const res = await axiosME.get()
  const mangas = transformSummaryResponse(res.data.manga)

  await Manga.insertMany(mangas)

  console.log('Seeding step 1 - Manga summaries inserted into mangas table.')
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const insertMangaInfosById = async () => {
  const mangaInfoIds = await Manga.find({}).then((result) => result.map((r) => r._id))
  return await processMangaIds(mangaInfoIds)
}

const fetchSingleManga = async (id) => {
  const res = await axiosMI.get(`${process.env.MANGA_INFO_URL}/${id}/`)
  return res.data
}

const insertMangaInfo = async (manga) => {
  await MangaInfo.create(manga)
  console.log(`${manga.alias} inserted.`)
}

seed().then(() => {
  insertMangaInfosById()
    .then((err, result) => console.log(`Err::${err} || Result::${result}`))
    .catch((e) => console.error(`Other error: ${e}`))
    .finally(() => process.exit(0))
})

// const task = cron.schedule('2 * * * * *', () => {
//   console.log('running a task every 2 seconds')
//   process.exit(0)
// })

// task.start()

function processMangaIds(ids) {
  return Promise.all(
    ids.map(async (id) => {
      await fetchSingleManga(id)
        .then((mangaInfo) => transformSingleMangaResponse(mangaInfo))
        .then((transformed) => insertMangaInfo(transformed))
        .catch((e) => console.error(`Error!: ${e}`))
        .finally(() => sleep(5000))
    })
  )
}
