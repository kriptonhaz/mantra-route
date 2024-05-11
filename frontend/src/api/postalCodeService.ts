import axios, { AxiosInstance } from "axios"

type CaritasAPIParams = {
  cookie?: string
}

let API: AxiosInstance

const setupAPIClient = () => {
  API = axios.create({
    baseURL: "https://postalcodes.interaktiv.sg",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })

  API.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      if (error.response) {
        console.error(
          JSON.stringify({
            name: "[caritas-api][error]",
            detail: error.response?.data,
          })
        )
      } else {
        console.error("[error]", error)
      }

      return Promise.reject(error)
    }
  )
}

export const initialize = (params?: CaritasAPIParams, anonymous?: boolean): AxiosInstance => {
  // always create new axios instance when cookie changed
  if (params?.cookie || !API || anonymous) {
    setupAPIClient()
  }

  // add auth header
  if (params?.cookie) {
    API.interceptors.request.use((config) => {
      // @ts-ignore
      config.headers = {
        ...config.headers,
      }

      return config
    })
  }

  return API
}

export default initialize
