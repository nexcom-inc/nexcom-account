import axios from 'axios';



const AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      'Content-Type': 'application/json',
      mode: 'no-cors'
    },
    withCredentials: true,
  });


export default AxiosInstance;