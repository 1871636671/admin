import { ref } from 'vue'
import type { Ref } from 'vue'
import type { ConfigType, ResType } from '@/apis/type'
import { useStore } from '@/stores/store'

Promise<ResType<string>>

interface RequestOptions {
  cancel?: boolean
  manual?: boolean
}

interface RequestFn<T> {
  (): Promise<ResType<T>>
}

export const useRequest = <T>(request: RequestFn<T>, options: RequestOptions = {}) => {
  const data = ref<Ref<T> | null>(null)
  const loading = ref(false)
  const error = ref(null)
  const cancelFn = null

  const { cancel, manual } = options

  if (cancel) {
    const store = useStore()
  }

  const fn = async () => {
    loading.value = true

    request()
      .then((res) => {
        setTimeout(() => {
          data.value = res.data
        }, 2000)
      })
      .catch((err) => {
        error.value = err
      })
      .finally(() => {
        loading.value = false
      })
  }

  !manual && fn()

  return {
    data,
    loading,
    error,
    cancelFn
  }
}
