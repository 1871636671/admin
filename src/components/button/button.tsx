import { defineComponent } from 'vue'
import buttonProps from 'ant-design-vue/es/button/buttonTypes'
import styles from './button.module.scss'

const Button = defineComponent({
  props: {
    ...buttonProps(),
    clickType: {
      type: String,
      validator(value: string) {
        return ['add', 'edit', 'remove', 'view'].includes(value)
      }
    },
    onClick: {
      type: Function
    },
    text: {
      type: [String, Number],
      default: '确定'
    },
    customType: {
      type: String,
      default: 'theme'
    }
  },
  setup(props) {
    const clickHandler = (...arg: any[]) => {
      console.log(props.clickType)
      props.onClick && props.onClick(...arg)
    }

    return () => (
      <a-button
        class={[
          styles['button-style'],
          props.customType === 'theme' ? styles['ant-btn-theme'] : styles['ant-btn-theme-thing']
        ]}
        {...props}
        onClick={clickHandler}
      >
        {props.text}
      </a-button>
    )
  }
})

export default Button
