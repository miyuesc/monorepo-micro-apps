[@miyue-mma/shared](../index.md) / EventEmitter

# EventEmitter

## 构造函数

### new EventEmitter()

```ts
new EventEmitter(): EventEmitter
```

#### 返回

[`EventEmitter`](EventEmitter.md)

## 方法

### addListener()

```ts
addListener(
   type, 
   fn, 
   context?, 
   once?): EventEmitter
```

注册事件订阅函数

#### 参数

##### type

事件类型

`string` | `string`[]

##### fn

[`EventEmitterListener`](../interfaces/EventEmitterListener.md)

回调函数

##### context?

`unknown`

上下文

##### once?

`boolean`

是否只执行一次

#### 返回

[`EventEmitter`](EventEmitter.md)

***

### emit()

```ts
emit(type, ...rest): false | EventEmitter
```

触发事件

#### 参数

##### type

`string`

事件类型

##### rest

...`any`[]

回调函数参数

#### 返回

`false` \| [`EventEmitter`](EventEmitter.md)

***

### eventNames()

```ts
eventNames(): (string | symbol)[]
```

获取所有已经订阅的事件

#### 返回

(`string` \| `symbol`)[]

***

### hasListener()

```ts
hasListener(type, fn): boolean
```

检查是否存在事件订阅函数

#### 参数

##### type

`string`

事件类型

##### fn

[`EventEmitterListener`](../interfaces/EventEmitterListener.md)

回调函数参数

#### 返回

`boolean`

***

### listeners()

```ts
listeners(type): 
  | undefined
  | EventEmitterListener[]
```

获取某个事件的所有订阅函数

#### 参数

##### type

`string`

事件类型

#### 返回

  \| `undefined`
  \| [`EventEmitterListener`](../interfaces/EventEmitterListener.md)[]

***

### listenersCount()

```ts
listenersCount(type): number
```

获取某个事件的订阅函数数量

#### 参数

##### type

`string`

事件类型

#### 返回

`number`

***

### on()

```ts
on(
   type, 
   fn, 
   context?): EventEmitter
```

注册事件订阅函数

#### 参数

##### type

`string`

事件类型

##### fn

`any`

回调函数

##### context?

`any`

上下文

#### 返回

[`EventEmitter`](EventEmitter.md)

***

### once()

```ts
once(
   type, 
   fn, 
   context?): EventEmitter
```

注册事件订阅函数，只执行一次

#### 参数

##### type

`string`

事件类型

##### fn

`any`

回调函数

##### context?

`any`

上下文

#### 返回

[`EventEmitter`](EventEmitter.md)

***

### removeAllListeners()

```ts
removeAllListeners(type?): any
```

移除事件订阅函数，指定类型时移除该类型的所有订阅函数，不指定类型时移除所有

#### 参数

##### type?

`string`

事件类型

#### 返回

`any`

***

### removeListener()

```ts
removeListener(type, fn?): EventEmitter
```

移除事件订阅函数，指定 fn 时只移除指定的 fn，不指定 fn 时移除所有

#### 参数

##### type

事件类型

`string` | `string`[]

##### fn?

[`EventEmitterListener`](../interfaces/EventEmitterListener.md)

回调函数参数

#### 返回

[`EventEmitter`](EventEmitter.md)
