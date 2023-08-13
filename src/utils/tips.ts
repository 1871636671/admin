import { message } from 'ant-design-vue'
import type { NoticeType } from 'ant-design-vue/es/message'
import { Modal } from 'ant-design-vue'
import { h, createVNode } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

export const showToast = (msg: string, type: NoticeType = 'success') => {
  message[type](typeof msg === 'string' ? msg : '请求失败!')
}

export const deleteModal = () => {
  return new Promise((res) => {
    Modal.confirm({
      title: '删除',
      content: h('div', {}, [h('p', '删除后不可恢复,是否继续?')]),
      icon: createVNode(ExclamationCircleOutlined),
      okText: '确认',
      cancelText: '取消',
      onOk() {
        res('ok')
      },
      onCancel() {
        res(null)
      }
    })
  })
}
