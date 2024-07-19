// 基础节点类型
export type BaseNodeType = 'task' | 'service' | 'event' | 'gateway' | 'expression' | 'subprocess'
export interface BaseNodeBO {
  $type?: string
  cls?: string
  [key: string]: unknown
}
// 基础节点对象
export interface BaseNode {
  id: string
  type: string
  name: string
  next?: BaseNode
  prev?: BaseNode
  businessData: BaseNodeBO
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
// 辅助的网关条件分支
export interface BranchNodeList {
  expression: ExpressionNode
  nextNodeList: BaseNode[]
}
