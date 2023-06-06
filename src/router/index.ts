import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views'
import routes from './routes'
import { routeHandle } from '@/utils/utils'
import { useStore } from '@/stores/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
      children: []
    }
  ]
})

router.beforeEach((to) => {
  const store = useStore()

  if (store.menuList.length === 0) {
    const { r1, r2 } = routeHandle(routes)

    r1.forEach((r) => router.addRoute('index', r))

    store.menuList.push(...r2)

    return {
      path: to.fullPath,
      replace: true
    }
  }

  const keyPath = to.fullPath.split('/').filter(Boolean)

  if (keyPath.length) {
    store.setSelectKey(keyPath[keyPath.length - 1])

    store.crumbs = [
      ...(store.crumbObj[keyPath[0]] || []),
      {
        name: to.meta.name || '',
        icon: to.meta.icon,
        path: keyPath[0]
      }
    ]

    console.log(store.crumbs)
  } else {
    store.setSelectKey('')
  }
})

export default router
