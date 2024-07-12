// 基础节点类型
export type BaseNodeType = 'task' | 'service' | 'event' | 'gateway' | 'expression' | 'subprocess'
// 基础节点对象
export interface BaseNode {
  id: string
  type: string
  name: string
  next: BaseNode | null
  prev: BaseNode | null
  businessData: Record<string, unknown>
}
// 基础任务节点
export interface TaskNode extends BaseNode {
  type: 'task'
}
// 基础服务节点
export interface ServiceNode extends BaseNode {
  type: 'service'
}
// 基础事件节点
export interface EventNode extends BaseNode {
  type: 'event'
}
// 基础条件节点
export interface ExpressionNode extends BaseNode {
  type: 'expression'
  expression: string
  parent?: GatewayNode
}
// 基础网关节点
export interface GatewayNode extends BaseNode {
  type: 'gateway'
  expressions: ExpressionNode[]
  default?: ExpressionNode
}
// 基础子流程节点
export interface SubprocessNode extends BaseNode {
  type: 'subprocess'
  start?: EventNode
}
