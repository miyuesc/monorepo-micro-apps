import type { BaseNode } from '@/types/node-models'

// 节点可用操作前置验证规则
export type CanRuleValidator = (targetNode?: BaseNode, node?: BaseNode) => boolean
export type CanRemove = CanRuleValidator | boolean
export type CanAppend = CanRuleValidator | boolean
export type CanMove = CanRuleValidator | boolean
export type CanDropped = CanRuleValidator | boolean

// 节点操作后置可执行验证规则
export type AsyncExecutionValidator = (node?: BaseNode) => Promise<boolean>
export type ExecutionValidator = (node?: BaseNode) => boolean
