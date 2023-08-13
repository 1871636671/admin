import { defineComponent, h, ref, resolveComponent } from 'vue'
import styles from './menu.module.scss'
import { Table, Modal } from '@/components'
import type { TableOptions } from '@/components/table/table'
import { useStore } from '@/stores/store'
import type { HandlyType } from '@/components/modal/modal'
import { addMenu, editMenu, getMenu, removeMenu } from '@/apis/menu'
import { showToast } from '@/utils/tips'
import { routeHandle } from '@/utils/utils'
import { deleteModal } from '@/utils/tips'

const MenuView = defineComponent({
  setup() {
    const store = useStore()

    console.log(store, '!!!')

    const source: TableOptions = {
      columns: [
        {
          title: '标题',
          dataIndex: 'name',
          form: {
            type: 'input',
            valueKey: 'name',
            label: '标题',
            placeholder: '请输入节点标题',
            rules: [{ required: true }]
          }
        },
        {
          title: '类型',
          dataIndex: 'type',
          form: {
            type: 'radio',
            valueKey: 'type',
            label: '类型',
            rules: [{ required: true }],
            options: [
              {
                key: '目录',
                value: 0
              },
              {
                key: '菜单',
                value: 1
              },
              {
                key: '权限',
                value: 2
              }
            ]
          },
          slot: true
        },
        {
          title: '标识符',
          dataIndex: 'path',
          form: {
            type: 'input',
            valueKey: 'path',
            label: '标识符',
            placeholder: '请输入标识符',
            vIf: (form) => form.type !== 2
          }
        },
        {
          title: '文件路径',
          dataIndex: 'viewPath',
          form: {
            type: 'input',
            valueKey: 'viewPath',
            label: '文件路径',
            placeholder: '请输入文件路径',
            rules: [{ required: true }],
            vIf: (form) => form.type === 1
          }
        },
        {
          title: '图标',
          dataIndex: 'icon',
          form: {
            type: 'input',
            valueKey: 'icon',
            label: '图标',
            placeholder: '请输入图标名称',
            vIf: (form) => form.type !== 2
          },
          slot: true
        },

        {
          title: '排序',
          dataIndex: 'sortNumber',
          form: {
            type: 'inputNumber',
            valueKey: 'sortNumber',
            label: '排序'
          },
          slot: true
        },
        {
          title: '权限',
          dataIndex: 'roleTag',
          form: {
            type: 'input',
            valueKey: 'roleTag',
            label: '权限',
            placeholder: '请输入唯一标识符,例如 user:btn:add',
            vIf: (form) => form.type === 2
          },
          slot: true
        },
        {
          title: '操作',
          dataIndex: 'custom',
          slotComponent: (column, data, permissionList) => ({
            name: 'div',
            props: {
              style: 'display:flex;gap:10px'
            },
            children: [
              {
                name: 'g-button',
                props: {
                  text: '添加',
                  btnStyle: 'text',
                  icon: h(resolveComponent('plus-outlined')),
                  submitType: 'add',
                  onSubmit: () => null
                },
                vIf: data.type !== 2
              },
              {
                name: 'g-button',
                props: {
                  text: '编辑',
                  btnStyle: 'text',
                  customType: 'warn',
                  icon: h(resolveComponent('form-outlined')),
                  submitType: 'edit',
                  onSubmit: () => null
                }
              },
              {
                name: 'g-button',
                props: {
                  text: '删除',
                  btnStyle: 'text',
                  customType: 'danger',
                  submitType: 'remove',
                  icon: h(resolveComponent('delete-outlined')),
                  onSubmit: () => null
                }
              }
            ]
          })
        }
      ],
      options: {}
    }

    const isShow = ref(false)

    const handlyType = ref<HandlyType>('view')

    const form = ref()

    const parentId = ref(null)

    const loading = ref(false)

    const getList = () => {
      getMenu().then((res) => {
        const { r2 } = routeHandle(res || [])

        store.menuList = [...r2]
      })
    }

    const onEvent = (type: string, column, data) => {
      if (['add', 'edit'].includes(type)) {
        if (type === 'edit') {
          form.value = data
        }

        if (type === 'add') {
          parentId.value = data && data.id ? data.id : null
        }

        handlyType.value = type as HandlyType
        isShow.value = true
      }

      if (type === 'remove') {
        deleteModal().then((res) => {
          if (res) {
            removeMenu(data.id).then(() => {
              showToast('删除成功!')
              getList()
            })
          }
        })
      }
    }

    const confirm = (type: string, data: any) => {
      const fn = type === 'add' ? addMenu : editMenu

      if (type === 'add' && parentId.value) data.parentId = parentId.value

      loading.value = true

      fn(data)
        .then(() => {
          showToast(type === 'add' ? '添加成功!' : '修改成功!')
          isShow.value = false
          getList()
        })
        .catch(() => null)
        .finally(() => {
          loading.value = false
        })
    }
    const cancel = () => {
      isShow.value = false
    }

    return () => (
      <div class={styles.container}>
        <Table source={source} data={store.menuList} rowKey={'id'} onEvent={onEvent}>
          {{
            type: (_, data: any) => {
              return data.type === 0 ? (
                <a-tag color="var(--theme-color)">目录</a-tag>
              ) : data.type === 1 ? (
                <a-tag color="var(--primary-color)">菜单</a-tag>
              ) : (
                <a-tag color="var(--success-color)">权限</a-tag>
              )
            },
            icon: (_, data: any) => data.icon && h(resolveComponent(data.icon))
          }}
        </Table>

        <Modal
          v-model:isShow={isShow.value}
          type={handlyType.value}
          cloumns={source.columns}
          defaultData={form.value}
          confirm={confirm}
          cancel={cancel}
          loading={loading.value}
        ></Modal>
      </div>
    )
  }
})

export default MenuView
