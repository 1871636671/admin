import { request } from '@/utils/http'
import type { routeType } from '@/router/routes'

interface UserInfo {
  userName: string
}

interface LoginParams {
  user: string
  password: string
}

interface LoginInfo {
  menuList: routeType[]
  userInfo: UserInfo
}

export const login = (data: LoginParams) => {
  return request<string>({
    url: '/login',
    method: 'post',
    data
  })
}

export const getMenu = () => {
  return request<LoginInfo>({
    url: '/login/manager',
    method: 'get'
  })
}
