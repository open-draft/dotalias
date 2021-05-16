import { Predicate } from './given'

export function not<V>(predicate: Predicate<V>): Predicate<V> {
  return (value) => !predicate(value)
}
