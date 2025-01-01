[@miyue-mma/shared](../index.md) / partition

# 函数: partition()

```ts
function partition<T>(array, ...filters): T[][] & object
```

根据条件拆分数组

## 类型参数

• **T**

## 参数

### array

readonly `T`[]

待拆分数组

### filters

...[`PartitionFilter`](../type-aliases/PartitionFilter.md)\<`T`\>[]

过滤条件, 支持多个；在多个条件下，前面的条件匹配优先

## 返回

`T`[][] & `object`
