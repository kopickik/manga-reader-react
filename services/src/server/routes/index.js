import { Manga, MangaInfo } from '@/db/models'

const setupRoutes = (app) => {
  app.get('/manga', async (req, res, next) => {
    try {
      const mangas = await Manga.find({}).sort({ lastChapterDate: 'desc' })
      if (!mangas) return next(new Error(`Unable to retrieve mangas!`))
      return res.json(mangas)
    } catch (e) {
      return next(e)
    }
  })

  app.get('/manga/:mangaId', async (req, res, next) => {
    if (!req.params.mangaId) {
      return next(new Error(`No mangaInfoId present in request.`))
    }

    try {
      const manga = await Manga.findById(req.params.mangaId)
      if (!manga) return next(new Error(`Invalid mangaId.`))
      return res.json(manga)
    } catch (e) {
      return next(e)
    }
  })
}

export default setupRoutes
