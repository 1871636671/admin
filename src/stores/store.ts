import { defineStore } from 'pinia'
import type { routeType } from '@/router/routes'
import config from '@/config/website'
import type { RouteLocationNormalized } from 'vue-router'

interface curmbValue {
  name: string
  icon?: string
  path: string
}
interface curmbType {
  [key: string]: curmbValue[]
}

interface settingsType {
  theme?: string
  slider?: boolean
  footer?: boolean
  [key: string]: string | boolean | undefined
}

interface tabItem {
  name?: string
  icon?: string
}

export const useStore = defineStore('store', {
  state: () => ({
    // 菜单折叠状态
    collapsed: false,
    //菜单
    menuList: [] as routeType[],
    // 面包屑字典
    crumbObj: {} as curmbType,
    // 面包屑
    crumbs: [] as curmbValue[],
    // 菜单激活索引
    selectKey: localStorage.getItem('openKey')
      ? JSON.parse(localStorage.getItem('openKey') || '')
      : [],
    settings: {
      theme: config.defaultTheme,
      slider: true,
      footer: true,
      tab: true
    } as settingsType,
    tabs: new Map<string, tabItem>(),
    isTabActive: {}
  }),
  actions: {
    setSettings(st: Partial<typeof this.settings>) {
      if (st.theme && st.theme !== this.settings.theme) {
        document.getElementsByTagName('body')[0].style.setProperty('--theme-color', st.theme)
        document
          .getElementsByTagName('body')[0]
          .style.setProperty('--theme-color-light', `${st.theme}1a`)
      }

      this.settings = {
        ...this.settings,
        ...st
      }

      localStorage.setItem('settings', JSON.stringify(this.settings))
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    },
    setSelectKey(val: string) {
      this.selectKey = val ? [val] : []
      localStorage.setItem('selectKey', JSON.stringify(this.selectKey))
    },
    setTab(route: RouteLocationNormalized) {
      if (!route.path || config.whiteList.includes(route.path)) return

      const r = {
        ...route.meta
      }

      if (!this.tabs.has('/home')) {
        this.tabs.set('/home', {
          name: '首页',
          icon: 'ClusterOutlined'
        })
      }

      this.tabs.set(route.path, r)
    }
  }
})
