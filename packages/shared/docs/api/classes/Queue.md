[@miyue-mma/shared](../index.md) / Queue

# 类: Queue\<T\>

Queue
队列

## 类型参数

• **T**

## 构造函数

### new Queue()

```ts
new Queue<T>(config, preset): Queue<T>
```

#### 参数

##### config

[`QueueConfig`](../interfaces/QueueConfig.md)

队列配置

##### preset

`T`[] = `[]`

预设数据

#### 返回

[`Queue`](Queue.md)\<`T`\>

## 属性

### \_config

```ts
_config: QueueConfig;
```

***

### \_queue

```ts
_queue: T[];
```

## 方法

### clear()

```ts
clear(): Queue<T>
```

清空队列

#### 返回

[`Queue`](Queue.md)\<`T`\>

***

### enter()

```ts
enter(element): Queue<T>
```

入队列

#### 参数

##### element

`T`

入队列元素

#### 返回

[`Queue`](Queue.md)\<`T`\>

***

### get()

```ts
get(): T[]
```

获取队列数据

#### 返回

`T`[]

***

### isEmpty()

```ts
isEmpty(): boolean
```

判断队列是否为空

#### 返回

`boolean`

***

### out()

```ts
out(): undefined | T
```

出队列

#### 返回

`undefined` \| `T`

***

### peek()

```ts
peek(): T
```

获取队列头部元素

#### 返回

`T`

***

### size()

```ts
size(): number
```

获取队列的大小

#### 返回

`number`
