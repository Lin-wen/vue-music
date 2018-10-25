import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch, deleteSearch, clearSearch, savePlay, saveFavorite, deleteFavorite} from 'common/js/cache'

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
// 选择播放
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.radom) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
// 随机播放
export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
// 搜索、播放历史、收藏点击播放
export const insertSong = function ({commit, state}, song) {
  // let playList = state.playList.slice()
  // let sequenceList = state.sequenceList.slice()
  // let currentIndex = state.currentIndex
  // // 记录当前歌曲
  // let currentSong = playList[currentIndex]
  // // 查找当前列表中是否含有当前歌曲，返回当前索引
  // let fpIndex = findIndex(playList, song)
  // // 插入歌曲，索引+1
  // currentIndex++
  // // 插入这首歌曲到当前索引位置
  // playList.splice(currentIndex, 0, song)
  // // 包含这首歌
  // if (fpIndex > -1) {
  //   // 如果当前插入的序号大于列表中的序号
  //   if (currentIndex > fpIndex) {
  //     playList.splice(fpIndex, 1)
  //     currentIndex--
  //   } else {
  //     playList.splice(fpIndex + 1, 1)
  //   }
  // }

  // let currentSIndex = findIndex(sequenceList, currentSong) + 1
  // let fsIndex = findIndex(sequenceList, song)
  // sequenceList.splice(currentSIndex, 0, song)

  // if (fsIndex > -1) {
  //   // 如果当前插入的序号大于列表中的序号
  //   if (currentSIndex > fsIndex) {
  //     playList.splice(fpIndex, 1)
  //   } else {
  //     playList.splice(fpIndex + 1, 1)
  //   }
  // }

  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex

  let fpIndex = findIndex(playList, song)
  if (fpIndex > -1) {
    // 包含这首歌,列表不变
    currentIndex = fpIndex
  } else {
    // 插入歌曲到列表最后
    playList.push(song)
    currentIndex = playList.length - 1
  }

  let fsIndex = findIndex(sequenceList, song)

  if (fsIndex < 0) {
    sequenceList.push(song)
  }

  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}
// 保存搜索记录
export const saveSearchHistory = function ({commit}, keyword) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(keyword))
}
// 单个删除搜索记录
export const deleteSearchHistory = function ({commit}, keyword) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(keyword))
}
// 清空搜索记录
export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}
// 列表删除歌曲
export const deleteSong = function ({commit, state}, song) {
  let playList = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex

  let pIndex = findIndex(playList, song)
  playList.splice(pIndex, 1)
  let sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)

  if (currentIndex > pIndex || currentIndex === playList.length) {
    currentIndex--
  }

  commit(types.SET_PLAYLIST, playList)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  const playingState = playList.length > 0
  commit(types.SET_PLAYING_STATE, playingState)
}
// 清空播放列表
export const clearSongList = function ({commit}) {
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYING_STATE, false)
}
// 播放记录
export const setPlayHistroy = function ({commit}, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}
// 收藏歌曲
export const saveFavoriteList = function ({commit}, song) {
  commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}
// 取消收藏
export const deleteFavoriteList = function ({commit}, song) {
  commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}
