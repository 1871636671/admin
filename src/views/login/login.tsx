import { defineComponent, reactive } from 'vue'
import styles from './login.module.scss'
import config from '@/config/website'
import { Button, Icon } from '@/components'
import { showToast } from '@/utils/tips'
import { login as useLogin } from '@/apis/login'
import { useUser } from '@/stores/login'
import { useRouter } from 'vue-router'

const Login = defineComponent({
  setup() {
    const formData = reactive({
      user: '',
      password: ''
    })

    const router = useRouter()

    const login = () => {
      if (!formData.user || !formData.password) {
        showToast('账号和密码不能为空', 'warning')
        return
      }

      const user = useUser()

      useLogin(formData).then((res) => {
        showToast('登录成功!')
        user.setToeken(res || '')
        router.replace('/home')
      })
    }

    return () => (
      <div class={styles.container}>
        <div class={styles.card}>
          <div class={styles.titlle}>
            <img src={config.logo} />
            <p>{config.websiteName}</p>
          </div>
          <div class={styles.form}>
            <a-input
              v-model:value={formData.user}
              placeholder="请输入账号"
              v-slots={{
                prefix: () => <Icon name={'UserOutlined'} style={{ color: '#d9d9d9' }}></Icon>
              }}
            />
            <div style={{ width: '100%', height: '1px', backgroundColor: '#d9d9d9' }}></div>
            <a-input
              type="password"
              v-model:value={formData.password}
              placeholder="请输入密码"
              v-slots={{
                prefix: () => <Icon name={'LockOutlined'} style={{ color: '#d9d9d9' }}></Icon>
              }}
            />
          </div>
          <Button style={{ width: '80%', margin: '10px 0' }} text={'登录'} submit={login}></Button>
        </div>
      </div>
    )
  }
})

export default Login
