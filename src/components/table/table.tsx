import { defineComponent, h, resolveComponent, type PropType } from 'vue'
import styles from './table.module.scss'
import type { TableColumnType } from 'ant-design-vue'
import { Button } from '@/components'
import { tableProps } from 'ant-design-vue/es/table'

interface CustomSlot {
  name: string
  props?: {
    onSubmit?: () => void
    submitType?: string
    [key: string]: any
  }
  text?: any
  vIf?: boolean
  children?: CustomSlot[]
}

export interface FormType {
  type: string
  valueKey: string
  label: string
  options?: any[]
  rules?: any[]
  placeholder?: string
  formItemProps?: {
    [key: string]: any
  }
  vIf?: (formData: any) => boolean
  [key: string]: any
}

export interface CustomColnumsType extends TableColumnType {
  slotComponent?: (column?: CustomColnumsType, data?: any, permissionList?: string[]) => CustomSlot
  slot?: boolean
  form?: FormType
  hidden?: boolean
}

export interface TableOptions {
  columns: CustomColnumsType[]
  options: {}
}

const Table = defineComponent({
  props: {
    ...tableProps(),
    source: {
      type: Object as PropType<TableOptions>,
      default: () => ({})
    },
    data: {
      type: Array,
      default: () => []
    },
    onEvent: {
      type: Function,
      default: () => null
    }
  },
  setup(props, { slots }) {
    const HSlot = (vnode: CustomSlot, column: CustomColnumsType, record: any): any => {
      let vdom = null
      const nativeTag = ['div', 'span', 'img', 'p']
      const isNativeTag = nativeTag.includes(vnode.name)

      if (vnode.vIf !== undefined && !vnode.vIf) {
        return null
      }

      if (vnode.props) {
        if (vnode.props.onSubmit) {
          vnode.props.onSubmit = () => {
            props.onEvent(vnode.props?.submitType || '', column, record)
          }
        }

        if (vnode.props.onChange) {
          vnode.props.onChange = (val: any) => {
            props.onEvent(vnode.props?.submitType || 'change', val)
          }
        }
      }

      vdom = h(
        isNativeTag ? vnode.name : resolveComponent(vnode.name),
        vnode.props || {},
        vnode.children
          ? vnode.children.map((v) => HSlot(v, column, record))
          : isNativeTag
          ? vnode.text
          : { default: () => vnode.text }
      )

      return vdom
    }

    return () => (
      <div class={styles.container}>
        <div class={styles.handlyView}>
          <Button
            onSubmit={() => {
              props.onEvent('add')
            }}
            text={'添加'}
            icon={h(resolveComponent('plus-outlined'))}
          ></Button>
        </div>
        <a-table
          {...props}
          columns={props.source.columns.filter((r) => !r.hidden)}
          dataSource={props.data}
          // pagination={{ pageSize: 1 }}
        >
          {{
            bodyCell: ({ column, record }: { column: CustomColnumsType; record: any }) => {
              if (column.hidden) return null

              if (column.slotComponent) {
                return HSlot(column.slotComponent(column, record), column, record)
              }

              if (column.slot) {
                return (
                  slots[`${column.dataIndex}`] && slots[`${column.dataIndex}`]?.(column, record)
                )
              }
            }
          }}
        </a-table>
      </div>
    )
  }
})

export default Table
