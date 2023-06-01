import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views'
import routes from './routes'
import { routeHandle } from '@/utils/utils'
import { useStore } from '@/stores/store'

const { r1, r2 } = routeHandle(routes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
      children: [...r1]
    }
  ]
})

router.beforeEach((to, from) => {
  const store = useStore()
  if (store.menuList.length === 0) {
    store.menuList.push(...r2)
  }
})

export default router
