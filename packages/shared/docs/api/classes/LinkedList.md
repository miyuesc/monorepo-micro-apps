[@miyue-mma/shared](../index.md) / LinkedList

# LinkedList\<T\>

LinkedList
链表

## 类型参数

• **T**

## 构造函数

### new LinkedList()

```ts
new LinkedList<T>(config): LinkedList<T>
```

#### 参数

##### config

[`LinkedListConfig`](../interfaces/LinkedListConfig.md)

链表配置

#### 返回

[`LinkedList`](LinkedList.md)\<`T`\>

## 属性

### \_config

```ts
_config: LinkedListConfig;
```

***

### \_list

```ts
_list: LinkedListNode<T>[];
```

## 方法

### append()

```ts
append(value): LinkedListNode<T>
```

追加节点

#### 参数

##### value

`T`

节点的值

#### 返回

[`LinkedListNode`](../interfaces/LinkedListNode.md)\<`T`\>

***

### clear()

```ts
clear(): LinkedList<T>
```

清空链表

#### 返回

[`LinkedList`](LinkedList.md)\<`T`\>

***

### insert()

```ts
insert(
   value, 
   anchor, 
position): LinkedListNode<T>
```

中间插入节点

#### 参数

##### value

`T`

节点的值

##### anchor

[`LinkedListNode`](../interfaces/LinkedListNode.md)\<`T`\>

锚点

##### position

[`InsertPosition`](../type-aliases/InsertPosition.md) = `'before'`

插入位置

#### 返回

[`LinkedListNode`](../interfaces/LinkedListNode.md)\<`T`\>

***

### isEmpty()

```ts
isEmpty(): boolean
```

判断链表是否为空

#### 返回

`boolean`

***

### prepend()

```ts
prepend(value): LinkedListNode<T>
```

头部插入节点

#### 参数

##### value

`T`

节点的值

#### 返回

[`LinkedListNode`](../interfaces/LinkedListNode.md)\<`T`\>

***

### size()

```ts
size(): number
```

获取链表的大小

#### 返回

`number`
