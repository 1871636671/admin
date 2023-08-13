import { defineComponent, h, ref, resolveComponent, type Ref, onMounted } from 'vue'
import styles from './role.module.scss'
import { Table, Modal } from '@/components'
import type { TableOptions } from '@/components/table/table'
import { useStore } from '@/stores/store'
import type { HandlyType } from '@/components/modal/modal'
import { addMenu, editMenu, getMenu, removeMenu } from '@/apis/menu'
import { showToast } from '@/utils/tips'
import { routeHandle } from '@/utils/utils'
import { deleteModal } from '@/utils/tips'
import { editRole, getRole, getRoleDetail } from '@/apis/role'
import type { RoleList } from '@/apis/role'

const Role = defineComponent({
  setup() {
    const store = useStore()

    const source: TableOptions = {
      columns: [
        {
          title: 'id',
          dataIndex: 'id'
        },
        {
          title: '角色名称',
          dataIndex: 'roleName',
          form: {
            type: 'input',
            valueKey: 'roleName',
            label: '角色名称',
            placeholder: '请输入角色名称',
            rules: [{ required: true }]
          }
        },
        {
          title: '状态',
          dataIndex: 'isActive',
          slot: true,
          form: {
            type: 'switch',
            valueKey: 'isActive',
            label: '状态',
            checkedValue: 1,
            unCheckedValue: 0,
            rules: [{ required: true }]
          }
        },
        {
          title: '创建时间',
          dataIndex: 'createTime'
        },
        {
          title: '父子联动',
          hidden: true,
          form: {
            type: 'checkbox',
            valueKey: 'isChecked',
            label: '父子联动'
          }
        },
        {
          title: '权限',
          dataIndex: 'ids',
          hidden: true,
          form: {
            type: 'tree-select',
            valueKey: 'ids',
            label: '角色权限',
            treeData: store.treeList,
            placeholder: '请选择权限',
            rules: [{ required: true }]
          }
        },

        {
          title: '操作',
          dataIndex: 'custom',
          slotComponent: (_, data) => ({
            name: 'div',
            props: {
              style: 'display:flex;gap:10px'
            },
            children: [
              {
                name: 'g-button',
                props: {
                  text: '编辑',
                  btnStyle: 'text',
                  customType: 'warn',
                  icon: h(resolveComponent('form-outlined')),
                  submitType: 'edit',
                  onSubmit: () => null
                },
                vIf: data.id !== 1
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
                },
                vIf: data.id !== 1
              }
            ]
          })
        }
      ],
      options: {}
    }

    const isShow = ref(false)

    const handlyType = ref<HandlyType>('add')

    const form = ref()

    const loading = ref(false)

    const roleList = ref<RoleList[]>([])

    const switchLoading = ref<{ [key: number]: boolean }>({})

    const getList = () => {
      loading.value = true
      getRole()
        .then((res) => {
          roleList.value = res || []
        })
        .finally(() => {
          loading.value = false
        })
    }

    const onEvent = (type: HandlyType, column, data) => {
      if (type === 'edit') {
        getRoleDetail(data.id).then((res) => {
          form.value = res
          isShow.value = true
        })
      }

      if (type === 'add') {
        isShow.value = true
      }

      handlyType.value = type
    }

    const confirm = (type: string, data: any) => {
      console.log(type, data)

      const list = data.ids.map((t) => t.value || t)

      const v = { ...data, ids: list }

      console.log(v)

      if (type === 'edit') {
        editRole(v)
          .then(() => {
            showToast('修改成功')
            getList()
          })
          .finally(() => {
            isShow.value = false
          })
      }
    }
    const cancel = () => {
      isShow.value = false
    }

    const onChange = (val: number, data: any) => {
      if (val !== data.isActive) {
        switchLoading.value[data.id] = true
        editRole({
          ...data,
          isActive: val
        })
          .then(() => {
            showToast('修改成功')
            getList()
          })
          .finally(() => {
            switchLoading.value[data.id] = false
          })
      }
    }

    onMounted(() => {
      getList()
    })

    return () => (
      <div class={styles.container}>
        <Table
          source={source}
          data={roleList.value}
          rowKey={'id'}
          onEvent={onEvent}
          loading={loading.value}
        >
          {{
            isActive: (column, data) => (
              <a-switch
                checked={data.isActive}
                checkedValue={1}
                unCheckedValue={0}
                onChange={(val: number) => onChange(val, data)}
                loading={switchLoading.value[data.id]}
              ></a-switch>
            )
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

export default Role
