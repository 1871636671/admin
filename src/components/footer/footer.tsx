import { defineComponent } from 'vue'
import styles from './footer.module.scss'

const Footer = defineComponent({
  setup() {
    return () => <div class={styles.container}>{new Date().toLocaleString()}</div>
  }
})

export default Footer
