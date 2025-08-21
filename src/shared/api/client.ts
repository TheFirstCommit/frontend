import axios from 'axios'
const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://134.185.99.89:8080';

export const apiClient = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
})


