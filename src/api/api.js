import http from './http'
import config from '../../config'

const prod = process.env.NODE_ENV === 'production'
const staticPath = prod ? config.build.assetsSubDirectory : config.dev.assetsSubDirectory
const bannerData = staticPath + '/data/banner.json'
const discData = staticPath + '/data/disc.json'

export const getBanner = (params) => {
  return http.fetchGet(bannerData)
}

export const getDiscList = (params) => {
  return http.fetchGet(discData)
}
