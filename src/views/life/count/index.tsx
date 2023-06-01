import { defineComponent } from 'vue'
import styles from './count.module.scss'

const Count = defineComponent({
  setup() {
    return () => <div class={styles.container}></div>
  }
})

export default Count
