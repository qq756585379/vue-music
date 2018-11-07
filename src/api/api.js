import http from './http'
import config from '../../config'

const prod = process.env.NODE_ENV === 'production'
const staticPath = prod ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory
const bannerData = staticPath + '/data/banner.json'

export const getBanner = (params) => {
  return http.fetchGet(bannerData)
}
