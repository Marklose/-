import axios from '@/utils/request'
export const getCity = (level) =>
  axios({
    url: '/area/city',
    params: {
      level
    }
  })
export const getHotCity = () =>
  axios({
    url: '/area/hot'
  })

export const getCityCondition = (id) =>
  axios({
    url: '/houses/condition',
    params: { id }
  })

export const getCityMap = (id) =>
  axios({
    url: '/area/map',
    params: { id }
  })
export const getCommunity = (name, id) =>
  axios({
    url: '/area/community',
    params: {
      name,
      id
    }
  })
