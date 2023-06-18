import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import styles from '@/assets/style/index.module.scss'
import { Header, Slider, Footer, Tabs } from '@/components'
import { useStore } from '@/stores/store'

const IndexView = defineComponent({
  setup() {
    const store = useStore()

    return () => (
      <div class={styles.container}>
        {/* 侧边栏 */}
        <div style={{ flexShrink: 0 }}>{store.settings.slider && <Slider></Slider>}</div>
        <div class={styles.rightView}>
          {/* 导航栏 */}
          <Header></Header>
          {store.settings.tab && <Tabs></Tabs>}
          <div class={styles.content}>
            <RouterView></RouterView>
          </div>
          {/* 底部 */}
          {store.settings.footer && <Footer></Footer>}
        </div>
      </div>
    )
  }
})

export default IndexView
