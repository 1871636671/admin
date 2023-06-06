import { defineComponent } from 'vue'
import styles from './menu.module.scss'

const MenuView = defineComponent({
  setup() {
    return () => <div class={styles.container}></div>
  }
})

export default MenuView
