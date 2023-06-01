import { defineComponent } from 'vue'
import styles from './role.module.scss'

const Role = defineComponent({
  setup() {
    return () => <div class={styles.container}></div>
  }
})

export default Role
