import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import Header from '@/components/header/header'
import styles from '@/assets/style/index.module.scss'
import Slider from '@/components/slider/silder'
import Footer from '@/components/footer/footer'

const IndexView = defineComponent({
  setup() {
    return () => (
      <div class={styles.container}>
        <Slider></Slider>
        <div class={styles.rightView}>
          <Header></Header>
          <div class={styles.content}>
            <RouterView></RouterView>
          </div>
          <Footer></Footer>
        </div>
      </div>
    )
  }
})

export default IndexView
