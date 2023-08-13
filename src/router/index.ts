import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views'
// import routes from './routes'
import { routeHandle } from '@/utils/utils'
import { useStore } from '@/stores/store'
import LoginView from '@/views/login/login'
import { getMenu } from '@/apis/menu'
import { useUser } from '@/stores/login'
import { showToast } from '@/utils/tips'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
      redirect: 'home',
      children: []
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      children: []
    }
  ]
})

router.beforeEach(async (to) => {
  const store = useStore()
  const user = useUser()

  if (user.token) {
    if (to.path === '/login') {
      return {
        path: '/',
        replace: true
      }
    } else if (store.menuList.length === 0) {
      const res = await getMenu().catch(() => null)

      if (!res || res.length === 0) {
        showToast('暂未分配菜单,请联系管理员!', 'warning')
        user.removeToken()

        return {
          path: '/login',
          replace: true
        }
      }

      const { r1, r2, r3 } = routeHandle(res)

      r1.forEach((r) => router.addRoute('index', r))

      store.menuList.push(...r2)

      store.treeList.push(...r3)

      console.log(r3, r2, 'r3')

      return {
        ...to,
        replace: true
      }
    }
  } else {
    if (to.path !== '/login') {
      console.log('执行了')

      showToast('请先登录!', 'error')
      return {
        path: '/login',
        replace: true
      }
    }
  }
})

router.beforeResolve((to) => {
  const keyPath = to.path.split('/').filter(Boolean)

  const store = useStore()

  store.setTab(to)

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
