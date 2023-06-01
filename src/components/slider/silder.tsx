import { defineComponent, ref } from 'vue'
import styles from './slider.module.scss'
import config from '@/config/website'
import { useStore } from '@/stores/store'
import MenuItem from '../menuitem/menuItem'

const Slider = defineComponent({
  setup() {
    const openKeys = ref(['sub1'])
    const selectedKeys = ref(['1'])
    const store = useStore()

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
          mode="inline"
          inline-collapsed={store.collapsed}
        >
          <MenuItem list={store.menuList}></MenuItem>
        </a-menu>
      </div>
    )
  }
})

export default Slider
