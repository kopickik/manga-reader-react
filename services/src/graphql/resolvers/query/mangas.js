import MangasSvcAdapter from '@/adapters/mangas.svc.adapter'

const mangasResolver = async () => {
  return await MangasSvcAdapter.fetchAllMangas()
}

export default mangasResolver
