import { defineComponent } from 'vue'
import styles from './header.module.scss'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { useStore } from '@/stores/store'

const Header = defineComponent({
  setup() {
    const store = useStore()

    return () => (
      <div class={styles.container}>
        <div class={styles.icon} onClick={store.toggleCollapsed}>
          {store.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </div>
    )
  }
})

export default Header
