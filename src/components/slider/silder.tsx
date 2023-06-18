import { defineComponent } from 'vue'
import styles from './slider.module.scss'
import config from '@/config/website'
import { useStore } from '@/stores/store'
import Menu from '../menu/menu'

const Slider = defineComponent({
  setup() {
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
        <Menu></Menu>
      </div>
    )
  }
})

export default Slider
