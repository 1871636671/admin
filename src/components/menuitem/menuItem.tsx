import { defineComponent, resolveComponent, h } from 'vue'
import type { PropType } from 'vue'
import type { routeType } from '@/router/routes'

const MenuItem = defineComponent({
  props: {
    list: {
      type: Array as PropType<routeType[]>,
      default: () => []
    }
  },
  setup(props) {
    const menuClick = () => {}

    return () => {
      return props.list.map((item) => {
        if (item.children && item.children.length > 0) {
          return (
            <a-sub-menu
              key={item.path}
              title={item.name}
              icon={() => h(resolveComponent(item.icon || ''))}
            >
              <MenuItem list={item.children}></MenuItem>
            </a-sub-menu>
          )
        } else {
          return (
            <a-menu-item
              onClick={() => menuClick()}
              key={item.path}
              icon={() => h(resolveComponent(item.icon || ''))}
            >
              {item.name}
            </a-menu-item>
          )
        }
      })
    }
  }
})

export default MenuItem
