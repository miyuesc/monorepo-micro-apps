[@miyue-mma/shared](../index.md) / throttle

# throttle()

```ts
function throttle<T>(
   func, 
   wait, 
   options?): (this, ...cargs) => unknown
```

## Type Parameters

• **T** *extends* (...`args`) => `any`

## Parameters

### func

`T`

### wait

`number`

### options?

`ThrottleOptions`

## Returns

`Function`

### Parameters

#### this

`any`

#### cargs

...`unknown`[]

### Returns

`unknown`

### cancel()

```ts
cancel: () => void;
```

#### Returns

`void`

### flush()

```ts
flush: () => unknown;
```

#### Returns

`unknown`
