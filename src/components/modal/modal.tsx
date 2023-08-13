import { defineComponent, ref, type PropType, reactive, watch } from 'vue'
import styles from './modal.module.scss'
import { Button } from '@/components'
import type { MouseEventHandler } from 'ant-design-vue/es/_util/EventInterface'
import type { CustomColnumsType, FormType } from '../table/table'
import type { AnyString } from 'env'
import type { FormInstance } from 'ant-design-vue'
import _ from 'lodash'

export type HandlyType = 'add' | 'edit' | 'view' | 'change' | 'remove'

const Modal = defineComponent({
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    cancel: {
      type: Function,
      default: () => null
    },
    confirm: {
      type: Function,
      default: () => null
    },
    type: {
      type: String as PropType<HandlyType>,
      default: 'add'
    },
    cloumns: {
      type: Object as PropType<CustomColnumsType[]>,
      default: () => ({})
    },
    defaultData: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:isShow'],
  setup(props, { emit }) {
    const formData = ref<AnyString>({})
    const formRef = ref<FormInstance>()

    const cancel = (type: number) => {
      formData.value = {}
      formRef.value && formRef.value.clearValidate()

      if (type === 1) {
        emit('update:isShow', false)
      } else {
        props.cancel()
      }
    }

    const confirm = async () => {
      if (['add', 'edit'].includes(props.type) && formRef.value) {
        const res = await formRef.value.validate().catch(() => null)

        res && props.confirm(props.type, formData.value)
      }
    }

    const createFormItem = (form: FormType) => {
      if (form.type === 'input') {
        return (
          <a-input
            v-model:value={formData.value[`${form.valueKey}`]}
            placeholder={form.placeholder}
          ></a-input>
        )
      }

      if (form.type === 'radio') {
        return (
          <a-radio-group v-model:value={formData.value[`${form.valueKey}`]}>
            {form.options && form.options.map((a) => <a-radio value={a.value}>{a.key}</a-radio>)}
          </a-radio-group>
        )
      }

      if (form.type === 'checkbox') {
        return <a-checkbox v-model:checked={formData.value[`${form.valueKey}`]}></a-checkbox>
      }

      if (form.type === 'inputNumber') {
        return (
          <a-input-number
            v-model:value={formData.value[`${form.valueKey}`]}
            min={0}
          ></a-input-number>
        )
      }

      if (form.type === 'switch') {
        return (
          <a-switch
            v-model:checked={formData.value[`${form.valueKey}`]}
            checkedValue={form.checkedValue}
            unCheckedValue={form.unCheckedValue}
          ></a-switch>
        )
      }

      if (form.type === 'tree-select') {
        return (
          <a-tree-select
            v-model:value={formData.value[`${form.valueKey}`]}
            tree-data={form.treeData}
            tree-checkable
            allow-clear
            show-checked-strategy="SHOW_ALL"
            placeholder={form.placeholder}
            labelInValue
            treeCheckStrictly={!formData.value['isChecked']}
          />
        )
      }
    }

    watch(
      () => props.isShow,
      (value) => {
        if (value && props.type === 'edit') {
          console.log(props.type, '!!!')

          formData.value = _.cloneDeep(props.defaultData)
        } else {
          // formData.value = {}
        }
      }
    )

    return () => (
      <a-modal
        open={props.isShow}
        title={props.type === 'add' ? '添加' : props.type === 'edit' ? '编辑' : '查看'}
        onCancel={() => cancel(1)}
        v-slots={{
          footer: () => (
            <>
              <Button text={'取消'} btnStyle="border" onClick={() => cancel(2)}></Button>
              <Button text={'确定'} loading={props.loading} onClick={confirm}></Button>
            </>
          )
        }}
      >
        <a-form ref={formRef} model={formData.value} style={{ margin: '30px 0' }}>
          {props.cloumns.map((l) => {
            if (!l.form) return null

            if (l.form.vIf) {
              const isTrue = l.form.vIf(formData.value)

              if (!isTrue) return null
            }

            return (
              <a-form-item
                label-col={{ span: 5 }}
                label={l.form.label}
                name={l.form.valueKey}
                rules={l.form.rules}
              >
                {createFormItem(l.form)}
              </a-form-item>
            )
          })}
        </a-form>
      </a-modal>
    )
  }
})

export default Modal
