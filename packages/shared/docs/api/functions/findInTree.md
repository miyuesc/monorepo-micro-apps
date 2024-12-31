[@miyue-mma/shared](../index.md) / findInTree

# findInTree()

```ts
function findInTree<T>(
   tree, 
   finder, 
   props): T | undefined
```

在树形数组中查找指定元素

## 类型参数

• **T** *extends* `Record`\<`string`, `unknown`\>

## 参数

### tree

`T`[]

源数组

### finder

(`i`, `idx`) => `boolean`

查找函数

### props

[`TreeArrayProps`](../interfaces/TreeArrayProps.md) = `{}`

配置项

## 返回

`T` \| `undefined`
