export function prepend(str: string) {
  return (value: string) => str + value
}

export function append(str: string) {
  return (value: string) => value + str
}

export function startsWith(substr: string) {
  return (value: string) => {
    return value.startsWith(substr)
  }
}

export function endsWith(substr: string) {
  return (value: string) => {
    return value.endsWith(substr)
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
