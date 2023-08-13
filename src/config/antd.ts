import {
  Button,
  Menu,
  Breadcrumb,
  Drawer,
  Switch,
  Input,
  InputNumber,
  Divider,
  Table,
  Tag,
  Modal,
  Form,
  Checkbox,
  Radio,
  TreeSelect
} from 'ant-design-vue'
import * as Icons from '@ant-design/icons-vue'
import type { App } from 'vue'

const componentList = [
  Button,
  Menu,
  Breadcrumb,
  Drawer,
  Switch,
  Input,
  Divider,
  Table,
  Tag,
  Modal,
  Form,
  Checkbox,
  Radio,
  InputNumber,
  TreeSelect
]

export default (app: App) => {
  componentList.forEach(app.use)

  for (const key in Icons) {
    if (Object.prototype.hasOwnProperty.call(Icons, key)) {
      // @ts-ignore
      app.component(key, Icons[key])
    }
  }
}
