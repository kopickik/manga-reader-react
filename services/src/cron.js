import 'dotenv/config'
import axios from 'axios'
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

const transformSingleMangaResponse = async ({ id, data }) => {
  try {
    const record = await Manga.findById({ _id: id })
    record.info = new MangaInfo(data)
    record.save()
    console.log(`Record with ID ${record._id} updated!`)
    sleep(2000)
  } catch (e) {
    return new Error(`Error! ${e}`)
  }
}

const seed = async () => {
  const res = await axiosME.get()
  const mangas = transformSummaryResponse(res.data.manga)
  try {
    await Manga.insertMany(mangas)
    console.log('Seeding step 1 - Manga summaries inserted into mangas table.')
  } catch (e) {
    return new Error(`Error!: ${e}`)
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const insertMangaInfosById = async () => {
  const mangaInfoIds = await Manga.find({}).then((result) => result.map((r) => r._id))
  return await processMangaIds(mangaInfoIds)
}

const fetchSingleManga = async (id) => {
  const res = await axiosMI.get(`${process.env.MANGA_INFO_URL}/${id}/`)
  return Object.assign({
    id: id,
    data: res.data,
  })
}

function processMangaIds(ids) {
  return Promise.all(
    ids.map(async (id) => {
      await fetchSingleManga(id)
        .then((mangaInfo) => {
          transformSingleMangaResponse(mangaInfo)
        })
        .catch((e) => console.error(`Error!: ${e}`))
        .finally(() => sleep(1000))
    })
  )
}

seed().then(() => {
  insertMangaInfosById()
    .then((err, result) => console.log(`Err::${err.length} || Result::${result}`))
    .catch((e) => console.error(`Other error: ${e}`))
    .finally(() => process.exit(0))
})
