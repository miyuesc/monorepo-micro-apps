[@miyue-mma/shared](../index.md) / template

# template()

## Call Signature

```ts
function template(
   str, 
   object, 
   fallback?): string
```

### Parameters

#### str

`string`

#### object

`Record`\<`string` \| `number`, `any`\>

#### fallback?

`string` | (`key`) => `string`

### Returns

`string`

### Link

https://github.com/antfu/utils/blob/main/src/string.ts
Dead simple template engine, just like Python's `.format()`
Support passing variables as either in index based or object/name based approach
While using object/name based approach, you can pass a fallback value as the third argument

### Example

```
const result = template(
  'Hello {0}! My name is {1}.',
  'Inès',
  'Anthony'
) // Hello Inès! My name is Anthony.
```

```
const result = namedTemplate(
  '{greet}! My name is {name}.',
  { greet: 'Hello', name: 'Anthony' }
) // Hello! My name is Anthony.
```

const result = namedTemplate(
  '{greet}! My name is {name}.',
  { greet: 'Hello' }, // name isn't passed hence fallback will be used for name
  'placeholder'
) // Hello! My name is placeholder.
```

## Call Signature

```ts
function template(str, ...args): string
```

### Parameters

#### str

`string`

#### args

...(`undefined` \| `null` \| `string` \| `number` \| `bigint`)[]

### Returns

`string`

### Link

https://github.com/antfu/utils/blob/main/src/string.ts
Dead simple template engine, just like Python's `.format()`
Support passing variables as either in index based or object/name based approach
While using object/name based approach, you can pass a fallback value as the third argument

### Example

```
const result = template(
  'Hello {0}! My name is {1}.',
  'Inès',
  'Anthony'
) // Hello Inès! My name is Anthony.
```

```
const result = namedTemplate(
  '{greet}! My name is {name}.',
  { greet: 'Hello', name: 'Anthony' }
) // Hello! My name is Anthony.
```

const result = namedTemplate(
  '{greet}! My name is {name}.',
  { greet: 'Hello' }, // name isn't passed hence fallback will be used for name
  'placeholder'
) // Hello! My name is placeholder.
```
