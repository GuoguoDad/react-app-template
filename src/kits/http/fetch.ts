import axios, { AxiosRequestConfig } from 'axios'
import { BaseResponse } from './response'
import { ResponseLogInterceptor } from './interceptors/response-log-interceptor'
import { AuthInterceptor } from './interceptors/auth-intereceptor'
import { ErrorResponseInterceptor } from './interceptors/error-response-interceptor'
import { TokenInjectRequestInterceptor } from './interceptors/token-interceptor'

const instance = axios.create()
instance.defaults.headers['Content-Type'] = 'application/json'
instance.defaults.headers.Accept = 'application/json'
// WARN 使用拦截器当时候 要注意 拦截器先后顺序，会影响返回结果
// dev 模式下记录 http 日志
if (process.env.NODE_ENV === 'development') {
  instance.interceptors.response.use(...ResponseLogInterceptor)
}
// 鉴权拦截器
instance.interceptors.response.use(...AuthInterceptor)
// @ts-ignore 错误响应拦截
instance.interceptors.response.use(...ErrorResponseInterceptor)

// 注入token
instance.interceptors.request.use(...TokenInjectRequestInterceptor)

const Fetch = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) => {
    return instance
      .get<BaseResponse<T>>(url, { ...config })
      .then((res) => res.data)
  },
  post: <T = any>(url: string, data: any = {}, config?: AxiosRequestConfig) => {
    return instance
      .post<BaseResponse<T>>(url, data, { ...config })
      .then((res) => res.data)
  },
  request: <T = any>(config: AxiosRequestConfig) => instance.request<BaseResponse<T>>({ ...config }),
}

export default Fetch
