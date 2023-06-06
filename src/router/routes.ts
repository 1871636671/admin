export interface routeType {
  id: number
  name: string
  path: string
  viewPath?: string
  icon?: string
  parentId?: number
  sortNumber?: number
  children?: routeType[]
  keyPath?: string
}

const routes: routeType[] = [
  {
    id: 1,
    name: '首页',
    icon: 'ClusterOutlined',
    path: 'home',
    viewPath: 'home',
    sortNumber: 1
  },
  {
    id: 2,
    name: '系统监控',
    icon: 'FundProjectionScreenOutlined',
    path: 'overview',
    sortNumber: 2
  },
  {
    id: 201,
    name: '统计',
    parentId: 2,
    icon: 'BarChartOutlined',
    path: 'statistics',
    viewPath: 'overview/statistics',
    sortNumber: 1
  },
  {
    id: 3,
    name: '生活',
    icon: 'AliwangwangOutlined',
    path: 'life',
    sortNumber: 3
  },
  {
    id: 301,
    name: '锻炼',
    parentId: 3,
    icon: 'FireOutlined',
    path: 'exercise',
    sortNumber: 1
  },
  {
    id: 30101,
    name: '统计',
    parentId: 301,
    icon: 'PieChartOutlined',
    path: 'count',
    viewPath: 'life/count',
    sortNumber: 1
  },
  {
    id: 4,
    name: '系统管理',
    icon: 'SettingOutlined',
    path: 'system',
    sortNumber: 4
  },
  {
    id: 401,
    name: '菜单管理',
    parentId: 4,
    icon: 'ProfileOutlined',
    path: 'menu',
    viewPath: 'system/menu',
    sortNumber: 2
  },
  {
    id: 402,
    name: '角色管理',
    parentId: 4,
    icon: 'UserOutlined',
    path: 'role',
    viewPath: 'system/role',
    sortNumber: 1
  }
]

export default routes
