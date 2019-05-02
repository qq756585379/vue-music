import axios from 'axios'

// const prod = process.env.NODE_ENV === 'production'
// const domain = prod ? 'http://yangjunv5.top' : 'http://127.0.0.1:7777'
// axios.defaults.timeout = 10000
// axios.defaults.baseURL = domain
// axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'

export default {
  fetchGet(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPost(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
