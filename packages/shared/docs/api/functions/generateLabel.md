[@miyue-mma/shared](../index.md) / generateLabel

# generateLabel()

```ts
function generateLabel<T>(
   data, 
   value, 
   props): string | undefined
```

根据指定值，将指定属性名组装为字符串

## 类型参数

• **T** *extends* `Record`\<`string`, `unknown`\>

## 参数

### data

`T`[]

源对象数组

### value

`unknown`

指定值

### props

[`GenerateLabelProps`](../interfaces/GenerateLabelProps.md) = `{}`

配置项

## 返回

`string` \| `undefined`
