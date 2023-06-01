import type { ButtonProps } from 'ant-design-vue'

export type ButtonType = 'link' | 'default' | 'primary' | 'ghost' | 'dashed' | 'text' | 'theme'
declare interface ButtonType extends ButtonProps {
  clickType?: 'add' | 'edit' | 'remove' | 'view'
  onClick?(...arg: any[]): void
  text?: string | number
}

export declare const buttonProps: () => {
  prefixCls: StringConstructor
  type: PropType<ButtonType>
  htmlType: {
    type: PropType<ButtonHTMLType>
    default: string
  }
  shape: {
    type: PropType<ButtonShape>
  }
  size: {
    type: PropType<SizeType>
  }
  loading: {
    type: PropType<
      | boolean
      | {
          delay?: number
        }
    >
    default: () =>
      | boolean
      | {
          delay?: number
        }
  }
  disabled: {
    type: BooleanConstructor
    default: any
  }
  ghost: {
    type: BooleanConstructor
    default: any
  }
  block: {
    type: BooleanConstructor
    default: any
  }
  danger: {
    type: BooleanConstructor
    default: any
  }
  icon: import('vue-types').VueTypeValidableDef<any>
  href: StringConstructor
  target: StringConstructor
  title: StringConstructor
  onClick: {
    type: PropType<MouseEventHandler | MouseEventHandler[]>
  }
  onMousedown: {
    type: PropType<MouseEventHandler | MouseEventHandler[]>
  }
}

export { ButtonType }
