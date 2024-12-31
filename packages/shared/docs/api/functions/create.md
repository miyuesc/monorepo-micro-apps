[@miyue-mma/shared](../index.md) / create

# create()

```ts
function create<T>(length, formatter?): T[]
```

生成指定长度数组

## 类型参数

• **T** = `number`

## 参数

### length

`number`

需要生成的数组长度

### formatter?

(`idx`) => `T`

数组元素格式化函数，接受一个索引参数，返回数组元素

## 返回

`T`[]
