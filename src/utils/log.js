import { devOnly } from './env'

export const log = devOnly((...params) => {
  console.log(...params)
})

export const warn = devOnly((...params) => {
  console.warn(...params)
})
