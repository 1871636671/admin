import { defineComponent, h, resolveComponent } from 'vue'
import type { StyleValue, PropType } from 'vue'

interface fnType {
  (payload: MouseEvent): void
}

const Icon = defineComponent({
  props: {
    name: {
      type: String,
      default: 'QuestionCircleOutlined'
    },
    style: {
      type: Object as PropType<StyleValue>,
      default: () => ({})
    },
    onClick: {
      type: Function as PropType<fnType>,
      default: () => null
    }
  },
  setup(props) {
    return () => (
      <div
        onClick={props.onClick}
        style={[{ fontSize: '20px', cursor: 'pointer', display: 'inline-block' }, props.style]}
      >
        {h(resolveComponent(props.name))}
      </div>
    )
  }
})

export default Icon
