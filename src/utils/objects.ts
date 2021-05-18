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
