// lib/axios.ts
import axios from "axios"

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  withCredentials: true, // important pour envoyer les cookies
})

export default axiosInstance
