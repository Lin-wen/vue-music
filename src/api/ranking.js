import {commonParams} from './config'
import axios from 'axios'

export function getRanking () {
  const url = '/api/getRanking'
  const data = Object.assign({}, commonParams, {
    uin: 0,
    notice: 0,
    platform: 'h5',
    needNewCode: 1
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getTopList (topid) {
  const url = '/api/getTopList'
  const data = Object.assign({}, commonParams, {
    uin: 0,
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    tpl: 3,
    page: 'detail',
    type: 'top',
    topid: topid
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
