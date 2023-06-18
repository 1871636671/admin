import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import type { ResType } from '@/apis/type'
import { useUser } from '@/stores/login'
import type { AxiosResponse } from 'axios'
import { showToast } from './tips'
import router from '@/router'

const BASE_URL = import.meta.env.DEV ? '/api' : ''

axios.defaults.timeout = 30_000

axios.defaults.baseURL = BASE_URL

axios.interceptors.request.use((config) => {
  const store = useUser()

  // 请求拦截器
  const controller = new AbortController()

  config.signal = controller.signal

  store.cancelMap.set(config.url || '', controller.abort)

  if (store.token) {
    config.headers['Authorization'] = `Bearer ${store.token}`
  }

  return config
})

const resHandly = <T>(response: AxiosResponse<ResType<T>>): string => {
  const code = response.data?.code
  const user = useUser()

  switch (code) {
    case 401:
      user.removeToken()
      router.replace('/login')
      return '登录已过期,请重新登录!'

    default:
      return response.data?.msg || '请求失败!'
  }
}

export const request = <D>(config: AxiosRequestConfig): Promise<D | null> => {
  const url = config?.url || ''

  return new Promise((resolve, reject) => {
    axios<ResType<D>>(config)
      .then((res) => {
        if (res.data.code === 200) {
          resolve(res.data.data)
          return
        }

        const str = resHandly(res)
        showToast(str, 'error')
        reject(str)
      })
      .catch((err) => {
        const str = err?.message || '请求失败!'
        showToast(str, 'error')
        reject(str)
      })
      .finally(() => {
        const store = useUser()
        store.cancelMap.delete(url) //删除没用的请求控制器
      })
  })
}

export default axios
