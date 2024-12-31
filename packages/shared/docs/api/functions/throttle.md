[@miyue-mma/shared](../index.md) / throttle

# throttle()

```ts
function throttle<T>(
   func, 
   wait, 
   options?): (this, ...cargs) => unknown
```

## 类型参数

• **T** *extends* (...`args`) => `any`

## 参数

### func

`T`

### wait

`number`

### options?

[`ThrottleOptions`](../interfaces/ThrottleOptions.md)

## 返回

`Function`

### 参数

#### this

`any`

#### cargs

...`unknown`[]

### 返回

`unknown`

### cancel()

```ts
cancel: () => void;
```

#### 返回

`void`

### flush()

```ts
flush: () => unknown;
```

#### 返回

`unknown`
