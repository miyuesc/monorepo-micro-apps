[@miyue-mma/shared](../index.md) / LinkedList

# LinkedList

## Constructors

### new LinkedList()

```ts
new LinkedList(config): LinkedList
```

#### Parameters

##### config

[`LinkedListConfig`](../interfaces/LinkedListConfig.md)

#### Returns

[`LinkedList`](LinkedList.md)

## Properties

### \_config

```ts
_config: LinkedListConfig;
```

***

### \_list

```ts
_list: LinkedListNode[];
```

## Methods

### \_createListNode()

```ts
_createListNode(value): LinkedListNode
```

#### Parameters

##### value

`unknown`

#### Returns

[`LinkedListNode`](../interfaces/LinkedListNode.md)

***

### append()

```ts
append(value): LinkedListNode
```

#### Parameters

##### value

`unknown`

#### Returns

[`LinkedListNode`](../interfaces/LinkedListNode.md)

***

### clear()

```ts
clear(): LinkedList
```

#### Returns

[`LinkedList`](LinkedList.md)

***

### insert()

```ts
insert(
   value, 
   anchor, 
   position): LinkedListNode
```

#### Parameters

##### value

`unknown`

##### anchor

[`LinkedListNode`](../interfaces/LinkedListNode.md)

##### position

[`InsertPosition`](../type-aliases/InsertPosition.md) = `'before'`

#### Returns

[`LinkedListNode`](../interfaces/LinkedListNode.md)

***

### isEmpty()

```ts
isEmpty(): boolean
```

#### Returns

`boolean`

***

### prepend()

```ts
prepend(value): LinkedListNode
```

#### Parameters

##### value

`unknown`

#### Returns

[`LinkedListNode`](../interfaces/LinkedListNode.md)

***

### size()

```ts
size(): number
```

#### Returns

`number`
