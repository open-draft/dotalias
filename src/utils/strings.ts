import { compose } from './compose'

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

export function normalizeWildcardString(source: string): string {
  return compose(
    prepend('^'),
    append('$'),
    replace(/\*/g, () => '(.*)')
  )(source)
}

export function replaceWildcardWithPositionals(source: string): string {
  let wildcardCount = 0
  return source.replace(/\*/g, () => {
    wildcardCount++
    return `$${wildcardCount}`
  })
}

export function injectPositionals(
  source: string,
  positionals: string[]
): string {
  return source.replace(/\$(\d)/g, (_, group) => {
    const positionalIndex = parseInt(group, 10) - 1
    return positionals[positionalIndex]
  })
}
