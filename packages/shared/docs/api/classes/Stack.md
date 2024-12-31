[@miyue-mma/shared](../index.md) / Stack

# Stack\<T\>

Stack
栈

## 类型参数

• **T**

## 构造函数

### new Stack()

```ts
new Stack<T>(config, preset): Stack<T>
```

#### 参数

##### config

[`StackConfig`](../interfaces/StackConfig.md)

栈配置

##### preset

`T`[] = `[]`

预设数据

#### 返回

[`Stack`](Stack.md)\<`T`\>

## 属性

### \_config

```ts
_config: StackConfig;
```

***

### \_stack

```ts
_stack: T[];
```

## 方法

### clear()

```ts
clear(): Stack<T>
```

清空栈

#### 返回

[`Stack`](Stack.md)\<`T`\>

***

### enter()

```ts
enter(element): Stack<T>
```

入栈

#### 参数

##### element

`T`

入栈元素

#### 返回

[`Stack`](Stack.md)\<`T`\>

***

### get()

```ts
get(): T[]
```

获取栈数据

#### 返回

`T`[]

***

### isEmpty()

```ts
isEmpty(): boolean
```

判断栈是否为空

#### 返回

`boolean`

***

### out()

```ts
out(): undefined | T
```

出栈

#### 返回

`undefined` \| `T`

***

### peek()

```ts
peek(): T
```

查看栈顶元素

#### 返回

`T`

***

### size()

```ts
size(): number
```

获取栈的大小

#### 返回

`number`
