// import axios from 'axios'
// axios.defaults.baseURL = 'http://liufusong.top:8080'
// axios.defaults.timeout = 30000

// export default axios
import axios from 'axios'
const request = axios.create({
  baseURL: 'http://liufusong.top:8080'
})
export default request
