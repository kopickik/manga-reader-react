import mongoose from 'mongoose'
import got from 'got'

const MANGAS_SVC_URL = process.env.MANGA_SVC_URL

export default class MangasSvcAdapter {
  static async fetchAllMangas() {
    try {
      const body = await got.get(`${MANGAS_SVC_URL}`).then((resp) => resp.body)
      return JSON.parse(body)
    } catch (e) {
      return `error: ${e}`
    }
  }

  static async fetchMangaById({ _id }) {
    try {
      const body = await got.get(`${MANGAS_SVC_URL}/${_id}`).json()
      return body
    } catch (e) {
      return `error: ${e}`
    }
  }
}
