export type Reducer<
  ObjectType extends Record<string, any>,
  ReturnType extends any = ObjectType
> = ObjectType extends Record<string, infer ValueType>
  ? (acc: ReturnType, entry: [string, ValueType]) => ReturnType
  : never

export function reduceEntries<
  ObjectType extends Record<string, any>,
  ReturnType extends any
>(
  reducer: Reducer<ObjectType, ReturnType>,
  initialValue: ReturnType = {} as any
) {
  return (obj: ObjectType): ReturnType => {
    return Object.entries(obj).reduce(reducer, initialValue)
  }
}

export type ObjectMapper<
  ObjectType extends Record<string, any>,
  ReturnType extends any
> = ObjectType extends Record<string, infer ValueType>
  ? (key: string, value: ValueType) => ReturnType
  : never

export function mapEntries<ObjectType extends Record<string, any>, ReturnType>(
  mapFn: ObjectMapper<ObjectType, ReturnType>
) {
  return reduceEntries<any, ReturnType[]>((acc, [key, value]) => {
    return acc.concat(mapFn(key, value))
  }, [])
}

export type Mapper<ArrayType extends Array<any>, ReturnType> = (
  value: ArrayType extends Array<infer ValueType> ? ValueType : never
) => ReturnType

export function map<ArrayType extends Array<any>, ReturnType extends any>(
  mapFn: Mapper<ArrayType, ReturnType>
) {
  return (arr: ArrayType) => {
    return arr.map(mapFn)
  }
}
