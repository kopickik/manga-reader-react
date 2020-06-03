import got from 'got'

const MANGAS_SVC_URL = process.env.MANGAS_URL || 'http://localhost:7000'

export default class MangasSvcAdapter {
  static async fetchAllMangas() {
    try {
      const body = await got.get(`${MANGAS_SVC_URL}/mangas`).json()
      return body
    } catch (e) {
      return `error: ${e}`
    }
  }
}
