import { request } from '@/utils/http'

interface LoginParams {
  user: string
  password: string
}

export const login = (data: LoginParams) => {
  return request<string>({
    url: '/login',
    method: 'post',
    data
  })
}
