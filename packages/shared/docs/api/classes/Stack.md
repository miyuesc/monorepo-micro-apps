[@miyue-mma/shared](../index.md) / Stack

# Stack

## Constructors

### new Stack()

```ts
new Stack(config, preset): Stack
```

#### Parameters

##### config

[`StackConfig`](../interfaces/StackConfig.md)

##### preset

`unknown`[] = `[]`

#### Returns

[`Stack`](Stack.md)

## Properties

### \_config

```ts
_config: StackConfig;
```

***

### \_stack

```ts
_stack: unknown[];
```

## Methods

### clear()

```ts
clear(): Stack
```

#### Returns

[`Stack`](Stack.md)

***

### enter()

```ts
enter(element): Stack
```

#### Parameters

##### element

`unknown`

#### Returns

[`Stack`](Stack.md)

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
