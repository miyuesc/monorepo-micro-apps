[@miyue-mma/shared](../index.md) / simpleMerge

# 函数: simpleMerge()

```ts
function simpleMerge<T>(target, source): T
```

简易合并两个对象（仅合并第一层，如果第一层是引用类型，则会浅拷贝第二个参数同源属性）

## 类型参数

• **T** *extends* `object`

## 参数

### target

`T` | `Partial`\<`T`\>

### source

`T`

## 返回

`T`
