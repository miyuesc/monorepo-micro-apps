[@miyue-mma/shared](../index.md) / sortWith

# sortWith()

```ts
function sortWith<T>(
   articles, 
   key, 
   len): T[]
```

对数组进行排序并返回前 n 个元素

## Type Parameters

• **T** *extends* `Record`\<`string`, `unknown`\>

## Parameters

### articles

`T`[]

### key

keyof `T`

### len

`number` = `10`

## Returns

`T`[]
