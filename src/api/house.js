import axios from '@/utils/request'
export const getHouse = (params) =>
  axios({
    url: '/houses',
    params
  })
export const getHouseInfos = (id) =>
  axios({
    url: `houses/${id}`
  })
export const getHouseParams = (token) =>
  axios({
    url: '/houses/params',
    headers: {
      Authorization: token
    }
  })
