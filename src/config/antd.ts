import { Button, Menu, Breadcrumb } from 'ant-design-vue'
import * as Icons from '@ant-design/icons-vue'
import type { App } from 'vue'

const componentList = [Button, Menu, Breadcrumb]

export default (app: App) => {
  componentList.forEach(app.use)

  for (const key in Icons) {
    if (Object.prototype.hasOwnProperty.call(Icons, key)) {
      // @ts-ignore
      app.component(key, Icons[key])
    }
  }
}
