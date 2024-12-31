[@miyue-mma/shared](../index.md) / sortWith

# sortWith()

```ts
function sortWith<T>(
   articles, 
   key, 
   len): T[]
```

对数组进行排序并返回前 n 个元素

## 类型参数

• **T** *extends* `Record`\<`string`, `unknown`\>

## 参数

### articles

`T`[]

源数组

### key

keyof `T`

排序的键名

### len

`number` = `10`

前 n 个元素

## 返回

`T`[]
