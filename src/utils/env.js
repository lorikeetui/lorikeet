import { noop } from './misc'

// Return a function that executes `cb` when on the dev environment
export function devOnly(cb) {
  return process.env.NODE_ENV === 'development' ? cb : noop
}
