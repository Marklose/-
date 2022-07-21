import axios from '@/utils/request'
export const getUpHouses = (token) =>
  axios({
    url: '/user/houses',
    headers: {
      authorization: token
    }
  })
export const UpDateImages = (data) =>
  axios({
    method: 'POST',
    url: '/houses/image',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
export const UpDateHouses = (token, data) =>
  axios({
    method: 'POST',
    url: '/user/houses',
    headers: {
      Authorization: token
    },
    data
  })
