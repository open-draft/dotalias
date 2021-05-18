export function prepend(prefix: string) {
  return (source: string) => prefix + source
}

export function append(suffix: string) {
  return (source: string) => source + suffix
}

export function startsWith(prefix: string) {
  return (source: string) => {
    return source.startsWith(prefix)
  }
}

export function endsWith(suffix: string) {
  return (value: string) => {
    return value.endsWith(suffix)
  }
}

export function replace(
  source: string | RegExp,
  replacer: (substring: string) => string
) {
  return (value: string) => {
    return value.replace(source, replacer)
  }
}

export function replaceWildcardWithPositionals(source: string): string {
  let wildcardCount = 0
  return source.replace(/\*/g, () => {
    wildcardCount++
    return `$${wildcardCount}`
  })
}
