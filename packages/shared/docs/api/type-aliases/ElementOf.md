[@miyue-mma/shared](../index.md) / ElementOf

# ElementOf\<T\>

```ts
type ElementOf<T> = T extends infer E[] ? E : never;
```

Infers the element type of an array

## Type Parameters

• **T**
