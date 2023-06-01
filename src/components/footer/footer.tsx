import { defineComponent } from 'vue'
import styles from './footer.module.scss'

const Footer = defineComponent({
  setup() {
    return () => <div class={styles.container}>header</div>
  }
})

export default Footer
