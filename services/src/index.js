import 'dotenv/config'

import '@/db/connection'
import '@/server/start'

import Manga from '@/db/models'

const manga1 = new Manga({
  _id: '5c1ad1b7719a1653e218e8f9',
  alias: 'monokuro-shounen-shoujo',
  categories: ['Comedy', 'Drama', 'Fantasy', 'Mystery', 'Romance', 'School Life', 'Shoujo'],
  hits: 15964,
  image: '05/0568c97d88c41ffb0198004ad3aeec59d3710a6016848bc84e056626.jpg',
  lastChapterDate: 1545371094.0,
  status: 2,
  title: 'Monokuro Shounen Shoujo',
})

manga1.save(function (err, resp) {
  if (err) {
    console.log('ERROR: ', err)
    process.exit(0)
  }
  console.log('@@', resp)
  console.log('saved monokuro-shounen-shoujo')
})
