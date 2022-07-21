import axios from '@/utils/request'
export const getUserInfo = (token) =>
  axios({
    url: '/user',
    headers: {
      Authorization: token
    }
  })
