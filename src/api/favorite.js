import axios from '@/utils/request'
export const getFavorite = (token) =>
  axios({
    url: '/user/favorites',
    headers: {
      Authorization: token
    }
  })
export const getHouseFavoriteInfo = (toekn, id) =>
  axios({
    url: '/user/favorites/' + id,
    headers: {
      Authorization: toekn
    }
  })
export const addHouseFavorite = (toekn, id) =>
  axios({
    method: 'POST',
    url: '/user/favorites/' + id,
    headers: {
      Authorization: toekn
    }
  })
export const delHouseFavorite = (toekn, id) =>
  axios({
    method: 'DELETE',
    url: '/user/favorites/' + id,
    headers: {
      Authorization: toekn
    }
  })
