import type { App } from 'vue'

export default function timerDirective(app: App) {
  app.directive('timer', {
    mounted(el) {
      el.startTime = new Date().getDate()
    },
    unmounted(el) {
      const leaveTime = (new Date().getDate() - el.startTime) / 1000

      console.log('停留时间为：', leaveTime)
    }
  })
}
