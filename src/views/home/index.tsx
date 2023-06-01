import { defineComponent } from 'vue'
import styles from './home.module.scss'

const Home = defineComponent({
  setup() {
    return () => <div class={styles.container}>11111</div>
  }
})

export default Home
