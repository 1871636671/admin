import { defineComponent, getCurrentInstance, nextTick, ref, watch } from 'vue'
import styles from './tabs.module.scss'
import { Icon } from '@/components'
import { useStore } from '@/stores/store'
import { useRoute, useRouter } from 'vue-router'

interface refList {
  [key: string]: any
}

const Tabs = defineComponent({
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const scrollRef = ref<HTMLDivElement | null>(null)
    const tabsRef = ref<refList>({})

    const move = (dec: string) => {
      if (!scrollRef.value) return
      if (dec === 'left') {
        scrollRef.value.scrollLeft -= 100
      } else {
        scrollRef.value.scrollLeft += 100
      }
    }

    const removeTab = (e: MouseEvent, key: string) => {
      e.stopPropagation()

      if (route.path !== key) {
        store.tabs.delete(key)
        return
      }

      let preRoute = ''
      store.tabs.forEach((_, k) => {
        if (k === key) {
          store.tabs.delete(key)
          router.push(preRoute)
        } else {
          preRoute = k
        }
      })
    }

    watch(
      () => route.path,
      (newValue, oldValue) => {
        nextTick(() => {
          if (newValue === oldValue || !scrollRef.value) return
          const active = tabsRef.value[`${route.path}`].getBoundingClientRect()
          const scrollView = scrollRef.value.getBoundingClientRect()

          if (active.left < scrollView.left) {
            scrollRef.value.scrollLeft -= scrollView.left - active.left
          }

          if (active.right > scrollView.right) {
            scrollRef.value.scrollLeft += active.right - scrollView.right
          }
        })
      }
    )

    return () => (
      <div class={styles.container}>
        <div class={styles.icon} onClick={() => move('left')}>
          <Icon name="DoubleLeftOutlined"></Icon>
        </div>
        <div class={styles.scrollview} ref={scrollRef}>
          <div class={styles.view}>
            {() => {
              const list: any[] = []

              store.tabs.forEach((value, key) => {
                list.push(
                  <div
                    class={[styles.tabs, route.path === key && styles.tabActive]}
                    onClick={() => router.push(key)}
                    ref={(el) => {
                      tabsRef.value[`${key}`] = el
                    }}
                  >
                    <span>{value.name}</span>
                    {key !== '/home' && (
                      <div class={styles.close} onClick={(e) => removeTab(e, key)}>
                        <Icon style={{ fontSize: 8 }} name="CloseOutlined"></Icon>
                      </div>
                    )}
                  </div>
                )
              })

              return list
            }}
          </div>
        </div>
        <div class={styles.icon} onClick={() => move('right')}>
          <Icon name="DoubleRightOutlined"></Icon>
        </div>
      </div>
    )
  }
})

export default Tabs
