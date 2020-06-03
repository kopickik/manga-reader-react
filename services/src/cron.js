import 'dotenv/config'
import axios from 'axios'
import cron from 'node-cron'
import Manga from '@/db/models'
import '@/db/connection'

const axiosME = axios.create({
  baseURL: process.env.MANGA_URL,
})

const transformResponse = (manga) =>
  manga
    .filter((manga) => manga.ld)
    .map(
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

const seed = async () => {
  const res = await axiosME.get()
  const mangas = transformResponse(res.data.manga)

  await Manga.insertMany(mangas)

  console.log('Seeded.')

  process.exit(0)
}

seed()

cron.schedule('0 * * * *', () => {
  console.log('running a task every hour')
})
