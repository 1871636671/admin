import { defineComponent, type PropType } from 'vue'
import buttonProps from 'ant-design-vue/es/button/buttonTypes'
import styles from './button.module.scss'

type ClickEnum = 'add' | 'edit' | 'remove' | 'view'

type CustomTypeEnum = 'primary' | 'warn' | 'danger'

type BtnStyleEnum = 'default' | 'border' | 'text'

const Button = defineComponent({
  props: {
    ...buttonProps(),
    clickType: {
      type: String as PropType<ClickEnum>,
      default: ''
    },
    onSubmit: {
      type: Function
    },
    text: {
      type: [String, Number],
      default: '确定'
    },
    customType: {
      type: String as PropType<CustomTypeEnum>,
      default: 'primary'
    },
    btnStyle: {
      type: String as PropType<BtnStyleEnum>,
      default: 'default'
    }
  },
  setup(props) {
    const clickHandler = (...arg: any[]) => {
      console.log(props.clickType)
      props.onSubmit && props.onSubmit(...arg)
    }

    return () => (
      <a-button
        class={[
          styles['button-style'],
          props.btnStyle === 'border'
            ? styles['ant-btn-theme-thing']
            : props.btnStyle === 'text'
            ? styles['ant-btn-link']
            : styles['ant-btn-theme']
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
