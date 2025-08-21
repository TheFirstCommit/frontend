import axios from 'axios'

export const apiClient = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
  baseURL: 'http://localhost:8080',
  withCredentials: true,
})

export const apiClientPublic = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: false,
})

