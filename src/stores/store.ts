import { defineStore } from 'pinia'
import type { routeType } from '@/router/routes'

export const useStore = defineStore('store', {
  state: () => ({
    // 主题色
    theme: localStorage.getItem('theme') || '',
    // 菜单折叠状态
    collapsed: false,
    //菜单
    menuList: [] as routeType[]
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
    }
  }
})
