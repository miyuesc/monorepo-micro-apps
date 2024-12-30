[@miyue-mma/shared](../index.md) / Queue

# Queue

## Constructors

### new Queue()

```ts
new Queue(config, preset): Queue
```

#### Parameters

##### config

[`QueueConfig`](../interfaces/QueueConfig.md)

##### preset

`unknown`[] = `[]`

#### Returns

[`Queue`](Queue.md)

## Properties

### \_config

```ts
_config: QueueConfig;
```

***

### \_queue

```ts
_queue: unknown[];
```

## Methods

### clear()

```ts
clear(): Queue
```

#### Returns

[`Queue`](Queue.md)

***

### enter()

```ts
enter(element): Queue
```

#### Parameters

##### element

`unknown`

#### Returns

[`Queue`](Queue.md)

***

### get()

```ts
get(): unknown[]
```

#### Returns

`unknown`[]

***

### isEmpty()

```ts
isEmpty(): boolean
```

#### Returns

`boolean`

***

### out()

```ts
out(): unknown
```

#### Returns

`unknown`

***

### peek()

```ts
peek(): unknown
```

#### Returns

`unknown`

***

### size()

```ts
size(): number
```

#### Returns

`number`
