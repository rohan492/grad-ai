import axios from 'axios'

export const Client = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "Some dummy backend base URL",
    headers: {
        "Content-Type": "multipart/form-data",
        "Accept": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_BACKEND_TOKEN}`
    }
})