[@miyue-mma/shared](../index.md) / bind

# 函数: bind()

```ts
function bind<K>(
   el, 
   event, 
   listener, 
   capture?): object
```

元素事件绑定

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

`object`

### unbind()

```ts
unbind: () => void;
```

#### 返回

`void`
