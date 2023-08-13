import type { App } from 'vue'
import Slider from './slider/silder'
import MenuItem from './menuitem/menuItem'
import Icon from './icon/icon'
import Header from './header/header'
import Footer from './footer/footer'
import Button from './button/button'
import Menu from './menu/menu'
import Tabs from './tabs/tabs'
import Table from './table/table'
import Modal from './modal/modal'

Icon.name = 'g-icon'
Table.name = 'g-table'
Button.name = 'g-button'

const globalComponent = [Icon, Table, Button]

export { Slider, MenuItem, Header, Footer, Button, Icon, Menu, Tabs, Table, Modal }

export default (app: App) => {
  globalComponent.forEach((c) => {
    app.component(c.name, c)
  })
}
