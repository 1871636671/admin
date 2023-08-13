import { request } from '@/utils/http'

export interface RoleList {
  id: number
  roleName: string
  parentId?: number
  isActive: number
  ids?: number[]
}

// 获取菜单
export const getRole = () => {
  return request<RoleList[]>({
    url: '/role/list',
    method: 'get'
  })
}

// 获取菜单详情
export const getRoleDetail = (id: number) => {
  return request<RoleList>({
    url: '/role/detail/' + id,
    method: 'get'
  })
}

// 修改菜单
export const editRole = (data: RoleList) => {
  return request<string>({
    url: '/role/edit',
    method: 'post',
    data
  })
}
