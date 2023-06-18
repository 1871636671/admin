export interface routeType {
  id: number
  name: string
  path: string
  viewPath?: string
  icon?: string
  parentId?: number
  sortNumber?: number
  children?: routeType[]
  type?: number
}

const staticRoutes: routeType[] = [
  {
    id: 1,
    name: '首页',
    icon: 'ClusterOutlined',
    path: 'home',
    viewPath: 'home',
    sortNumber: 1
  }
]

export default staticRoutes
