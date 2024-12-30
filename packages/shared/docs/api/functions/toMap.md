[@miyue-mma/shared](../index.md) / toMap

# toMap()

```ts
function toMap<T>(
   data, 
   key, 
props): Record<string, boolean | T>
```

转成对象结构

## Type Parameters

• **T** *extends* `Record`\<`string`, `unknown`\>

## Parameters

### data

`T`[]

### key

`string`

### props

[`ToMapProps`](../interfaces/ToMapProps.md) = `{}`

## Returns

`Record`\<`string`, `boolean` \| `T`\>
