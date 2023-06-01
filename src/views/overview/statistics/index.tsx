import { defineComponent } from 'vue'
import styles from './statistics.module.scss'

const Statistics = defineComponent({
  setup() {
    return () => <div class={styles.container}></div>
  }
})

export default Statistics
