[@miyue-mma/shared](../index.md) / simpleMerge

# simpleMerge()

```ts
function simpleMerge<T>(target, source): T
```

简易合并两个对象（仅合并第一层，如果第一层是引用类型，则会浅拷贝第二个参数同源属性）

## Type Parameters

• **T** *extends* `object`

## Parameters

### target

`T` | `Partial`\<`T`\>

### source

`T`

## Returns

`T`
