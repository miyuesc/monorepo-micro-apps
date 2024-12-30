[@miyue-mma/shared](../index.md) / delegate

# delegate()

```ts
function delegate<K>(
   element, 
   event, 
   selector, 
   callback, 
   capture?): object
```

代理事件

## Type Parameters

• **K** *extends* keyof `HTMLElementEventMap`

## Parameters

### element

`HTMLElement`

### event

`K`

### selector

`string`

### callback

(`element`, `ev`) => `unknown`

### capture?

`boolean`

## Returns

`object`

### unbind()

```ts
unbind: () => void;
```

#### Returns

`void`
