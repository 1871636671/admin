import type { routeType } from '@/router/routes'
import type { RouteRecordRaw } from 'vue-router'

interface routeRes {
  r1: RouteRecordRaw[]
  r2: routeType[]
}

interface flagType {
  [key: number]: routeType
}

const handle = (routes: routeType[], prefix: string = ''): RouteRecordRaw[] => {
  const r1: RouteRecordRaw[] = []

  routes.forEach((item) => {
    if (item.children && item.children.length > 0) {
      const r4 = handle(item.children, prefix ? prefix + `/${item.path}` : item.path)

      r1.push(...r4)
    } else {
      r1.push({
        path: prefix ? prefix + `/${item.path}` : item.path,
        name: item.path,
        component: () => import(`@/views/${item.viewPath}`),
        meta: {
          icon: item.icon,
          name: item.name
        },
        children: []
      })
    }
  })

  return r1
}

/**
 * 处理路由
 * @param routes
 * @returns r1 处理后的路由
 * @returns r2 处理后的树形菜单
 */
export const routeHandle = (routes: routeType[]): routeRes => {
  const r2: routeType[] = []
  const flag: flagType = {}

  routes.forEach((item) => {
    if (!item.children) item.children = []
    flag[item.id] = item
  })

  routes.forEach((item) => {
    if (!item.parentId) {
      r2.push(flag[item.id])
    } else {
      flag[item.parentId].children?.push(item)
    }
  })

  const r1 = handle(r2)

  return {
    r1,
    r2
  }
}
