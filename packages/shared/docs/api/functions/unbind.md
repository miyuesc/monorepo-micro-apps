[@miyue-mma/shared](../index.md) / unbind

# unbind()

```ts
function unbind<K>(
   el, 
   event, 
   listener, 
   capture?): void
```

元素事件解绑

## Type Parameters

• **K** *extends* keyof `HTMLElementEventMap`

## Parameters

### el

`HTMLElement`

### event

`K`

### listener

(`this`, `ev`) => `any`

### capture?

`boolean`

## Returns

`void`
