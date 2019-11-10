import { Button } from '@monoprefix/ui-components'

export const sum = (...numbers: number[]) => {
  const total = numbers.reduce((acc, el) => acc + el, 0)
  return `${Button()}${total}`
}
