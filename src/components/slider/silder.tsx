import { defineComponent, onMounted, ref, watch } from 'vue'
import styles from './slider.module.scss'
import config from '@/config/website'
import { useStore } from '@/stores/store'
import MenuItem from '../menuitem/menuItem'

interface menuRefType {
  menuClick: (path: string) => void
}

const Slider = defineComponent({
  setup() {
    const getKeys = (key: string) => {
      const keys = localStorage.getItem(key)

      return keys ? JSON.parse(keys) : []
    }

    const store = useStore()

    const openKeys = ref(getKeys('openKeys'))

    const selectedKeys = ref(store.selectKey)

    const menuItemRef = ref<menuRefType | null>(null)

    const onSelect = ({ keyPath }: { keyPath: string[] }) => {
      const path = '/' + keyPath.join('/')

      menuItemRef.value?.menuClick(path)
    }

    watch(openKeys, () => {
      localStorage.setItem('openKeys', JSON.stringify(openKeys.value))
    })

    return () => (
      <div class={styles.container} style={{ width: !store.collapsed ? '220px' : '81px' }}>
        <div class={styles.title}>
          <img src={config.logo} />
          <text
            class={styles.titleText}
            style={{
              width: !store.collapsed ? 'auto' : 0,
              marginLeft: !store.collapsed ? '10px' : 0,
              opacity: !store.collapsed ? 1 : 0,
              transition: !store.collapsed ? 'opacity 1s' : ''
            }}
          >
            {config.websiteName}
          </text>
        </div>
        <a-menu
          v-model:openKeys={openKeys.value}
          v-model:selectedKeys={selectedKeys.value}
          inline-collapsed={store.collapsed}
          onSelect={onSelect}
          mode="inline"
        >
          <MenuItem ref={menuItemRef} list={store.menuList}></MenuItem>
        </a-menu>
      </div>
    )
  }
})

export default Slider
