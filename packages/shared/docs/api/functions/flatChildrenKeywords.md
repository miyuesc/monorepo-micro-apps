[@miyue-mma/shared](../index.md) / flatChildrenKeywords

# flatChildrenKeywords()

```ts
function flatChildrenKeywords(node, props): string[]
```

获取一个树节点的所有子节点数组 ( 场景：将一个组织的 code 与该组织的子组织 code 合并到一个数组 )

## Parameters

### node

[`TreeNode`](../interfaces/TreeNode.md)

包含子节点的数据对象

### props

[`FlatChildrenKeysProps`](../interfaces/FlatChildrenKeysProps.md) = `{}`

默认关键字

## Returns

`string`[]

关键字数组
