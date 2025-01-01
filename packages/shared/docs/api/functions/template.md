[@miyue-mma/shared](../index.md) / template

# 函数: template()

## 调用签名

```ts
function template(
   str, 
   object, 
   fallback?): string
```

非常简单的模板引擎，就像Python的`.format()`一样支持以基于索引或基于对象名的方法传递变量在使用基于对象名的方法时，
您可以传递一个后备值作为第三个参数

### 参数

#### str

`string`

#### object

`Record`\<`string` \| `number`, `any`\>

#### fallback?

`string` | (`key`) => `string`

### 返回

`string`

### 链接

https://github.com/antfu/utils/blob/main/src/string.ts

### 示例

```
const result = template(
  'Hello {0}! My name is {1}.',
  'Inès',
  'Anthony'
) // Hello Inès! My name is Anthony.

const result = namedTemplate(
  '{greet}! My name is {name}.',
  { greet: 'Hello', name: 'Anthony' }
) // Hello! My name is Anthony.

const result = namedTemplate(
  '{greet}! My name is {name}.',
  { greet: 'Hello' }, // name isn't passed hence fallback will be used for name
  'placeholder'
) // Hello! My name is placeholder.
```

## 调用签名

```ts
function template(str, ...args): string
```

非常简单的模板引擎，就像Python的`.format()`一样支持以基于索引或基于对象名的方法传递变量在使用基于对象名的方法时，
您可以传递一个后备值作为第三个参数

### 参数

#### str

`string`

#### args

...(`undefined` \| `null` \| `string` \| `number` \| `bigint`)[]

### 返回

`string`

### 链接

https://github.com/antfu/utils/blob/main/src/string.ts

### 示例

```
const result = template(
  'Hello {0}! My name is {1}.',
  'Inès',
  'Anthony'
) // Hello Inès! My name is Anthony.

const result = namedTemplate(
  '{greet}! My name is {name}.',
  { greet: 'Hello', name: 'Anthony' }
) // Hello! My name is Anthony.

const result = namedTemplate(
  '{greet}! My name is {name}.',
  { greet: 'Hello' }, // name isn't passed hence fallback will be used for name
  'placeholder'
) // Hello! My name is placeholder.
```
