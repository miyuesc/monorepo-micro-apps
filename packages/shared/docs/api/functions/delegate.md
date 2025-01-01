[@miyue-mma/shared](../index.md) / delegate

# 函数: delegate()

```ts
function delegate<K>(
   element, 
   event, 
   selector, 
   callback, 
   capture?): object
```

事件代理

## 类型参数

• **K** *extends* keyof `HTMLElementEventMap`

## 参数

### element

`HTMLElement`

代理的元素

### event

`K`

事件名称

### selector

`string`

实际元素的选择器

### callback

(`element`, `ev`) => `unknown`

回调函数

### capture?

`boolean`

是否捕获阶段

## 返回

`object`

### unbind()

```ts
unbind: () => void;
```

#### 返回

`void`
