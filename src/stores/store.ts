import { defineStore } from 'pinia'
import type { routeType } from '@/router/routes'

interface curmbValue {
  name: string
  icon?: string
  path: string
}
interface curmbType {
  [key: string]: curmbValue[]
}

export const useStore = defineStore('store', {
  state: () => ({
    // 主题色
    theme: localStorage.getItem('theme') || '',
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
      : []
  }),
  actions: {
    /**
     * 修改主题色
     * @param color 哈希颜色值
     */
    setTheme(color: string) {
      this.theme = color
      localStorage.setItem('theme', color)
      document.getElementsByTagName('body')[0].style.setProperty('--theme-color', color)
      document
        .getElementsByTagName('body')[0]
        .style.setProperty('--theme-color-light', `${color}1a`)
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    },
    setSelectKey(val: string) {
      this.selectKey = val ? [val] : []
      localStorage.setItem('selectKey', JSON.stringify(this.selectKey))
    }
  }
})
