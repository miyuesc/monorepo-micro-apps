[@miyue-mma/shared](../index.md) / toMap

# toMap()

```ts
function toMap<T>(
   data, 
   key, 
props): Record<string, T | boolean>
```

转成对象结构

## 类型参数

• **T** *extends* `Record`\<`string`, `unknown`\>

## 参数

### data

`T`[]

源对象数组

### key

`string`

指定属性名

### props

[`ToMapProps`](../interfaces/ToMapProps.md) = `{}`

配置项

## 返回

`Record`\<`string`, `T` \| `boolean`\>
