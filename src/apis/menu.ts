import { request } from '@/utils/http'
import type { routeType } from '@/router/routes'

// 获取菜单
export const getMenu = () => {
  return request<routeType[]>({
    url: '/menu/list',
    method: 'get'
  })
}

// 添加菜单
export const addMenu = (data: Partial<routeType>) => {
  return request<string>({
    url: '/menu/add',
    method: 'post',
    data
  })
}

// 修改菜单
export const editMenu = (data: routeType) => {
  return request<string>({
    url: '/menu/edit',
    method: 'post',
    data
  })
}

//删除菜单
export const removeMenu = (id: number) => {
  return request<string>({
    url: '/menu/remove' + '/' + id,
    method: 'post'
  })
}
