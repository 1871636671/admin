import { message } from 'ant-design-vue'
import type { NoticeType } from 'ant-design-vue/es/message'

export const showToast = (msg: string, type: NoticeType = 'success') => {
  message[type](msg)
}
