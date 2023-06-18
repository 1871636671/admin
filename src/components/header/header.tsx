import { defineComponent, resolveComponent, h, ref } from 'vue'
import styles from './header.module.scss'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { useStore } from '@/stores/store'
import { Icon, Menu } from '@/components'
import config from '@/config/website'

const Header = defineComponent({
  setup() {
    const store = useStore()

    const visible = ref(false)

    const iconClick = (key: string) => {
      console.log('????')

      switch (key) {
        case 'settings':
          visible.value = !visible.value
          break

        default:
          break
      }
    }

    const onChange = (key: string, value: string | boolean) => {
      store.setSettings({ [key]: value })
    }

    const iconMap = [
      {
        name: 'GithubOutlined',
        key: 'github'
      },
      {
        name: 'SettingOutlined',
        key: 'settings'
      }
    ]

    const settngsMap = [
      {
        valueKey: 'theme',
        text: '主题颜色'
      },
      {
        valueKey: 'slider',
        text: '显示侧边栏'
      },
      {
        valueKey: 'footer',
        text: '显示 Footer'
      },
      {
        valueKey: 'tab',
        text: '显示 Tabs'
      }
    ]

    return () => (
      <div class={styles.container}>
        {/* 导航栏收缩按钮 */}
        <div class={styles.leftBox}>
          {store.settings.slider ? (
            <div class={styles.icon} onClick={store.toggleCollapsed}>
              {store.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
          ) : (
            <div class={styles.title}>
              <img src={config.logo} />
              <p class={styles.titleText}>{config.websiteName}</p>
            </div>
          )}

          {store.settings.slider ? (
            <a-breadcrumb style={{ marginLeft: '20px', fontSize: '16px' }}>
              {store.crumbs.map((crumb) => (
                <a-breadcrumb-item>
                  {h(resolveComponent(crumb.icon || ''))}
                  <span>{crumb.name}</span>
                </a-breadcrumb-item>
              ))}
            </a-breadcrumb>
          ) : (
            <Menu mode="horizontal"></Menu>
          )}
        </div>

        <div class={styles.rightBox}>
          {iconMap.map((item) => (
            <Icon
              style={{ margin: '0 5px' }}
              name={item.name}
              key={item.key}
              onClick={() => iconClick(item.key)}
            ></Icon>
          ))}
        </div>

        <a-drawer title="设置" placement="right" v-model:open={visible.value} width={256}>
          {settngsMap.map((item) => (
            <div class={styles.stView} key={item.valueKey}>
              <span>{item.text}</span>
              {item.valueKey === 'theme' ? (
                <color-picker
                  onFinish={({ hex }: { hex: string }) => onChange(item.valueKey, hex)}
                  hex={store.settings[item.valueKey]}
                ></color-picker>
              ) : (
                <a-switch
                  checked={store.settings[item.valueKey]}
                  onChange={(val: string | boolean) => onChange(item.valueKey, val)}
                />
              )}
            </div>
          ))}
        </a-drawer>
      </div>
    )
  }
})

export default Header
