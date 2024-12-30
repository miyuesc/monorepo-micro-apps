[@miyue-mma/shared](../index.md) / EventEmitter

# EventEmitter

## Constructors

### new EventEmitter()

```ts
new EventEmitter(): EventEmitter
```

#### Returns

[`EventEmitter`](EventEmitter.md)

## Methods

### \_addListener()

```ts
_addListener(
   type, 
   fn, 
   context?, 
   once?): EventEmitter
```

#### Parameters

##### type

`string`

##### fn

[`EventEmitterListener`](../interfaces/EventEmitterListener.md)

##### context?

`unknown`

##### once?

`boolean`

#### Returns

[`EventEmitter`](EventEmitter.md)

***

### \_removeListener()

```ts
_removeListener(type, fn?): EventEmitter
```

#### Parameters

##### type

`string`

##### fn?

[`EventEmitterListener`](../interfaces/EventEmitterListener.md)

#### Returns

[`EventEmitter`](EventEmitter.md)

***

### addListener()

```ts
addListener(
   type, 
   fn, 
   context?, 
   once?): EventEmitter
```

#### Parameters

##### type

`string` | `string`[]

##### fn

[`EventEmitterListener`](../interfaces/EventEmitterListener.md)

##### context?

`unknown`

##### once?

`boolean`

#### Returns

[`EventEmitter`](EventEmitter.md)

***

### emit()

```ts
emit(type, ...rest): false | EventEmitter
```

#### Parameters

##### type

`string`

##### rest

...`any`[]

#### Returns

`false` \| [`EventEmitter`](EventEmitter.md)

***

### eventNames()

```ts
eventNames(): (string | symbol)[]
```

#### Returns

(`string` \| `symbol`)[]

***

### hasListener()

```ts
hasListener(type, fn): boolean
```

#### Parameters

##### type

`string`

##### fn

[`EventEmitterListener`](../interfaces/EventEmitterListener.md)

#### Returns

`boolean`

***

### listeners()

```ts
listeners(type): 
  | undefined
  | EventEmitterListener[]
```

#### Parameters

##### type

`string`

#### Returns

  \| `undefined`
  \| [`EventEmitterListener`](../interfaces/EventEmitterListener.md)[]

***

### listenersCount()

```ts
listenersCount(type): number
```

#### Parameters

##### type

`string`

#### Returns

`number`

***

### on()

```ts
on(
   type, 
   fn, 
   context?): EventEmitter
```

#### Parameters

##### type

`string`

##### fn

`any`

##### context?

`any`

#### Returns

[`EventEmitter`](EventEmitter.md)

***

### once()

```ts
once(
   type, 
   fn, 
   context?): EventEmitter
```

#### Parameters

##### type

`string`

##### fn

`any`

##### context?

`any`

#### Returns

[`EventEmitter`](EventEmitter.md)

***

### removeAllListeners()

```ts
removeAllListeners(type?): any
```

#### Parameters

##### type?

`string`

#### Returns

`any`

***

### removeListener()

```ts
removeListener(type, fn?): EventEmitter
```

#### Parameters

##### type

`string` | `string`[]

##### fn?

[`EventEmitterListener`](../interfaces/EventEmitterListener.md)

#### Returns

[`EventEmitter`](EventEmitter.md)
