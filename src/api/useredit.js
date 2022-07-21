import axios from '@/utils/request'
export const upDateInfo = (token, values) =>
  axios({
    method: 'PATCH',
    url: '/user',
    headers: {
      Authorization: token
    },
    data: values
  })
