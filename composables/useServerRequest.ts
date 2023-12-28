// composables/useServerRequest.ts
import { useFetch, UseFetchOptions } from "#app";

function isArray(str: unknown) {
  return Object.prototype.toString.call(str) === '[object Array]'
}

export const useServerRequest = <T= unknown>(url: string, opts: UseFetchOptions<T, unknown>) => {
  const token = useCookie('token')
  // console.log('token',token)
  const runtimeConfig = useRuntimeConfig()

  const defaultOptions: UseFetchOptions<unknown> = {
    baseURL: runtimeConfig.public.baseUrl,
    onRequest({ request , options }) {
      options.headers = (options.headers || {}) as { [key: string]: string }
      options.headers['Empower'] = 'M0AE4QBqhBFlN9kevtTMQ2Zqja6tPzb3psyr2SIFKFPMlBmZxUrISi4gp2ZK4Rta30mpM/w+95lUOowosOv+0mhWui/rtb4Xh5eoI/PPAPucCk9z2oXLcj5BfLXZYHWnoiEZog9M9VAfTkYodR/yLcH0VEharB65sBtq2X2rMvJEl0ZGx7VWeItsIKHKTYdfQfPXG3dLNUHMRk3ihGVvHUJ04hQFTrxybx8RwF8UGamEgLt1SS7zzMMsd0RTek3rsKWbfJoE7mL8aXS/m8TymJxXcQ224ahaG30nE/8M4eEB+3riNy/WTwT8cbHQVO7T7bsSCu39r5Ydv6r/kNAEAg=='
      if (token.value) {
        options.headers.Authorization = 'Bearer ' + token.value
      }
    },
    onResponse({ response }) {
      if (+response.status !== 200 ) {
        console.log("response",response)
        process.client && ElMessage.error(response._data.msg)
      }
    },
    onResponseError({ response }) {
      process.client && ElMessage.error(isArray(response._data.msg) ? response._data.msg[0] : response._data.msg)
    },
  }

  return useFetch<T>( url, {...defaultOptions, ...opts} as any)
}