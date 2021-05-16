export type Predicate<V> = (value: V) => boolean

export function given<V>(predicate: Predicate<V>, apply: (value: V) => V) {
  return (value: V): V => {
    return predicate(value) ? apply(value) : value
  }
}
