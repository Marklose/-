import axios from '@/utils/request'
export const Register = (values) =>
  axios({
    method: 'POST',
    url: '/user/registered',
    data: values
  })
