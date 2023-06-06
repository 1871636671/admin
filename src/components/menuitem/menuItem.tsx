import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { routeType } from '@/router/routes'
import { useRouter } from 'vue-router'
import { Icon } from '@/components'

const MenuItem = defineComponent({
  props: {
    list: {
      type: Array as PropType<routeType[]>,
      default: () => []
    },
    crumb: String
  },
  setup(props, { expose }) {
    const router = useRouter()

    const menuClick = (path: string) => {
      if (path) {
        router.push(path)
      }
    }

    expose({
      menuClick
    })

    return () => {
      return props.list.map((item) => {
        if (item.children && item.children.length > 0) {
          const sy = props.crumb || item.path

          return (
            <a-sub-menu
              key={item.path}
              title={item.name}
              icon={() => <Icon name={item.icon}></Icon>}
            >
              <MenuItem list={item.children} crumb={sy}></MenuItem>
            </a-sub-menu>
          )
        } else {
          return (
            <a-menu-item key={item.path} icon={() => <Icon name={item.icon}></Icon>}>
              {item.name}
            </a-menu-item>
          )
        }
      })
    }
  }
})

export default MenuItem
