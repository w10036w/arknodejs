import LRU from 'lru-cache'
import { config } from 'package'

const isProd = process.env.NODE_ENV === 'production'

let api
if (process.__API__) {
  api = process.__API__
} else {
  api = process.__API__ = {
    prefix: 'http://127.0.0.1:8000/api',
    isServer: true,
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15 // 15 min cache
    })
  }
}

export default api
