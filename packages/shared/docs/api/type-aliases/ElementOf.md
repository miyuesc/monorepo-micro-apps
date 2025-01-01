[@miyue-mma/shared](../index.md) / ElementOf

# 类型别名: ElementOf\<T\>

```ts
type ElementOf<T> = T extends infer E[] ? E : never;
```

Infers the element type of an array

## 类型参数

• **T**
