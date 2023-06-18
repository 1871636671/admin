import { defineComponent, watch, ref } from 'vue'
import { MenuItem } from '@/components'
import { useStore } from '@/stores/store'

interface menuRefType {
  menuClick: (path: string) => void
}

const Menu = defineComponent({
  props: {
    mode: {
      type: String,
      default: 'inline'
    }
  },
  setup(props) {
    const getKeys = (key: string) => {
      const keys = props.mode === 'inline' ? localStorage.getItem(key) : ''

      return keys ? JSON.parse(keys) : []
    }

    const store = useStore()

    const openKeys = ref(getKeys('openKeys'))

    const menuItemRef = ref<menuRefType | null>(null)

    const onSelect = ({ keyPath }: { keyPath: string[] }) => {
      const path = '/' + keyPath.join('/')

      menuItemRef.value?.menuClick(path)
    }

    watch(openKeys, () => {
      localStorage.setItem('openKeys', JSON.stringify(openKeys.value))
    })

    return () => (
      <a-menu
        v-model:openKeys={openKeys.value}
        selectedKeys={store.selectKey}
        inline-collapsed={store.collapsed}
        onSelect={onSelect}
        mode={props.mode}
      >
        <MenuItem ref={menuItemRef} list={store.menuList}></MenuItem>
      </a-menu>
    )
  }
})

export default Menu
