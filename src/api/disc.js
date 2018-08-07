// import jsonp from 'common/js/jsonp'
import {commonParams} from './config'
import axios from 'axios'

export function getDiscDetail (discId) {
  const url = '/api/getDiscDetail'
  const data = Object.assign({}, commonParams, {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid: discId,
    loginUin: 0,
    hostUin: 0,
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
