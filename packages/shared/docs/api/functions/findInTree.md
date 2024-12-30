[@miyue-mma/shared](../index.md) / findInTree

# findInTree()

```ts
function findInTree<T>(
   tree, 
   finder, 
   props): T | undefined
```

在树形数组中查找指定元素

## Type Parameters

• **T** *extends* `Record`\<`string`, `unknown`\>

## Parameters

### tree

`T`[]

### finder

(`i`, `idx`) => `boolean`

### props

[`TreeArrayProps`](../interfaces/TreeArrayProps.md) = `{}`

## Returns

`T` \| `undefined`
