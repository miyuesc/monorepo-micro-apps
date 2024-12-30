[@miyue-mma/shared](../index.md) / bind

# bind()

```ts
function bind<K>(
   el, 
   event, 
   listener, 
   capture?): object
```

元素事件绑定

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

`object`

### unbind()

```ts
unbind: () => void;
```

#### Returns

`void`
