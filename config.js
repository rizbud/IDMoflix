import axios from "axios"

export const TARGET_URL = 'https://195.2.76.227'
export const APP_NAME = 'IDMoflix'
export const APP_VERSION = '1.0.0'
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36'

export const api = axios.create({
  baseURL: TARGET_URL,
  timeout: 60000,
  headers: {
    'User-Agent': USER_AGENT
  }
})