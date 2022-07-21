import axios from '@/utils/request'
export const UserLogin = (values) =>
  axios({
    method: 'POST',
    url: '/user/login',
    data: values
  })
