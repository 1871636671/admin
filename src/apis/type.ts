import type { AxiosRequestConfig } from 'axios'

export interface ResType<T> {
  code: number
  msg: string | undefined
  data: T | null
}

export interface ConfigType<D = any, R = any> extends AxiosRequestConfig {
  params?: D
  resType?: ResType<R>
}

export interface ConfigFn {
  (): ConfigType
}
