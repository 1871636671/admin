import type { routeType } from '@/router/routes'
import { useStore } from '@/stores/store'
import type { RouteRecordRaw } from 'vue-router'

interface RouteRes {
  r1: RouteRecordRaw[]
  r2: routeType[]
  r3: TreeType[]
}

export interface TreeType {
  label: string
  value: string | number
  children?: TreeType[]
}

interface FlagType {
  [key: number]: routeType
}

interface FlagType2 {
  [key: number]: TreeType
}

const cmp = import.meta.glob('../views/**/*.{tsx,vue}')

const handle = (routes: routeType[], prefix: string = ''): RouteRecordRaw[] => {
  const r1: RouteRecordRaw[] = []

  routes.forEach((item) => {
    if (item.type === 2) return

    if (item.children && item.children.length > 0 && item.type === 0) {
      const r4 = handle(item.children, prefix ? prefix + `/${item.path}` : item.path)

      crumbHandle(item, prefix || item.path)

      r1.push(...r4)
    } else {
      r1.push({
        path: prefix ? prefix + `/${item.path}` : item.path,
        name: item.path,
        component: cmp[`../views/${item.viewPath}/index.tsx`],
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

const crumbHandle = (r: routeType, key?: string) => {
  if (!key) return

  const store = useStore()

  if (!store.crumbObj[key]) {
    store.crumbObj[key] = []
  }

  const index = store.crumbObj[key].findIndex((i) => i.name === r.name)

  if (index === -1) {
    store.crumbObj[key].push({
      name: r.name,
      icon: r.icon,
      path: r.path
    })
  }
}

/**
 * 处理路由
 * @param routes
 * @returns r1 处理后的路由
 * @returns r2 处理后的树形菜单
 */
export const routeHandle = (routes: routeType[]): RouteRes => {
  const r2: routeType[] = []
  const r3: TreeType[] = []
  const flag: FlagType = {}
  const flag2: FlagType2 = {}

  routes.forEach((item) => {
    if (!item.children) item.children = []
    flag[item.id] = item
    flag2[item.id] = {
      label: item.name,
      value: item.id,
      children: []
    }
  })

  console.log(flag2, flag)

  routes.forEach((item) => {
    if (!item.parentId) {
      r2.push(flag[item.id])
      r3.push(flag2[item.id])
    } else {
      flag[item.parentId].children?.push({
        ...item
      })

      flag2[item.parentId].children?.push({
        label: item.name,
        value: item.id,
        children: []
      })
    }
  })

  const r1 = handle(r2)

  return {
    r1,
    r2,
    r3
  }
}
