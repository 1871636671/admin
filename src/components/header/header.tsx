import { defineComponent, resolveComponent, h } from 'vue'
import styles from './header.module.scss'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { useStore } from '@/stores/store'
import { Icon } from '@/components'

const Header = defineComponent({
  setup() {
    const store = useStore()

    const iconClick = (key: string) => {
      console.log(key)
    }

    const iconMap = [
      {
        name: 'GithubOutlined',
        key: 'github'
      }
    ]

    return () => (
      <div class={styles.container}>
        {/* 导航栏收缩按钮 */}
        <div class={styles.leftBox}>
          <div class={styles.icon} onClick={store.toggleCollapsed}>
            {store.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>

          {/* 面包屑 */}
          <a-breadcrumb style={{ marginLeft: '20px', fontSize: '16px' }}>
            {store.crumbs.map((crumb) => (
              <a-breadcrumb-item>
                {h(resolveComponent(crumb.icon || ''))}
                <span>{crumb.name}</span>
              </a-breadcrumb-item>
            ))}
          </a-breadcrumb>
        </div>

        <div class={styles.rightBox}>
          {iconMap.map((item) => (
            <Icon name={item.name} key={item.key} onClick={() => iconClick(item.key)}></Icon>
          ))}
        </div>
      </div>
    )
  }
})

export default Header
