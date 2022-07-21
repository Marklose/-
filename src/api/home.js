import axios from '@/utils/request'
export const getSwipers = () => axios({ url: '/home/swiper' })
export const getGroups = () => axios({ url: '/home/groups' })
