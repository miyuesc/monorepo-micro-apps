[@miyue-mma/shared](../index.md) / unbind

# 函数: unbind()

```ts
function unbind<K>(
   el, 
   event, 
   listener, 
   capture?): void
```

元素事件解绑

## 类型参数

• **K** *extends* keyof `HTMLElementEventMap`

## 参数

### el

`HTMLElement`

元素

### event

`K`

事件名称

### listener

(`this`, `ev`) => `any`

回调函数

### capture?

`boolean`

是否捕获阶段

## 返回

`void`
