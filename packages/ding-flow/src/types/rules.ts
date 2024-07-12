import type { BaseNode } from '@/types/node-models'

// 节点可用操作前置验证规则
export type CanRuleValidator = (node?: BaseNode) => Promise<boolean> | boolean
export type CanRemove = boolean | CanRuleValidator
export type CanAdd = boolean | CanRuleValidator
export type CanMove = boolean | CanRuleValidator

// 节点操作后置可执行验证规则
export type AsyncExecutionValidator = (node?: BaseNode) => Promise<boolean> | boolean
