import axios from 'axios'
const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:8080'; //백엔드ip로

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
  withCredentials: true,
})

export const apiClientPublic = axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: false,
})

