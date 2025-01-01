[@miyue-mma/shared](../index.md) / CancelablePromise

# 接口: CancelablePromise

定时器

## 属性

### \[toStringTag\]

```ts
readonly [toStringTag]: string;
```

***

### cancel

```ts
cancel: any;
```

## 方法

### catch()

```ts
catch<TResult>(onrejected?): Promise<any>
```

Attaches a callback for only the rejection of the Promise.

#### 类型参数

• **TResult** = `never`

#### 参数

##### onrejected?

The callback to execute when the Promise is rejected.

`null` | (`reason`) => `TResult` \| `PromiseLike`\<`TResult`\>

#### 返回

`Promise`\<`any`\>

A Promise for the completion of the callback.

***

### finally()

```ts
finally(onfinally?): Promise<any>
```

Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
resolved value cannot be modified from the callback.

#### 参数

##### onfinally?

The callback to execute when the Promise is settled (fulfilled or rejected).

`null` | () => `void`

#### 返回

`Promise`\<`any`\>

A Promise for the completion of the callback.

***

### then()

```ts
then<TResult1, TResult2>(onfulfilled?, onrejected?): Promise<TResult1 | TResult2>
```

Attaches callbacks for the resolution and/or rejection of the Promise.

#### 类型参数

• **TResult1** = `any`

• **TResult2** = `never`

#### 参数

##### onfulfilled?

The callback to execute when the Promise is resolved.

`null` | (`value`) => `TResult1` \| `PromiseLike`\<`TResult1`\>

##### onrejected?

The callback to execute when the Promise is rejected.

`null` | (`reason`) => `TResult2` \| `PromiseLike`\<`TResult2`\>

#### 返回

`Promise`\<`TResult1` \| `TResult2`\>

A Promise for the completion of which ever callback is executed.
