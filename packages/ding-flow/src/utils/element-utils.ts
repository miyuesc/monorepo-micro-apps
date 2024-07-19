import type { Ref } from 'vue'
import type {
  BaseNode,
  BaseNodeType,
  EventNode,
  ExpressionNode,
  GatewayNode,
  ServiceNode,
  SubprocessNode,
  TaskNode,
} from '@/types'
import { ids } from '@/utils/uuid'

// 节点记录表
export const nodeMaps: Map<BaseNode['id'], Ref<BaseNode>> = new Map()
/**
 * 记录新节点
 * @param node
 */
export function setNodeInMap(node: Ref<BaseNode>) {
  nodeMaps.set(node.value.id, node)
  return node
}
/**
 * 读取节点
 * @param id 节点 id
 */
export function getNodeInMap(id: BaseNode['id']) {
  return nodeMaps.get(id)
}
/**
 * 移除指定节点
 * @param id
 */
export function removeNodeInMap(id: BaseNode['id']) {
  const node = nodeMaps.get(id)
  nodeMaps.delete(id)
  return node
}

export const DEFAULT_NAME_MAP = {
  event: '事件',
  gateway: '网关',
  task: '任务',
  service: '服务',
  subprocess: '子流程',
  expression: '条件',
}
/**
 * 创建节点
 */
export function createNode(
  type: 'gateway',
  name?: string,
  bo?: Record<string, unknown>,
): GatewayNode
export function createNode(
  type: 'expression',
  name?: string,
  bo?: Record<string, unknown>,
): ExpressionNode
export function createNode(
  type: 'task',
  name?: string,
  bo?: Record<string, unknown>,
): TaskNode
export function createNode(
  type: 'service',
  name?: string,
  bo?: Record<string, unknown>,
): ServiceNode
export function createNode(
  type: 'event',
  name?: string,
  bo?: Record<string, unknown>,
): EventNode
export function createNode(
  type: 'subprocess',
  name?: string,
  bo?: Record<string, unknown>,
): SubprocessNode
export function createNode<T extends BaseNodeType>(
  type: T,
  name?: string,
  bo?: Record<string, unknown>,
): BaseNode {
  const base: BaseNode = {
    id: `${type}-${ids()}`,
    type,
    name: name || DEFAULT_NAME_MAP[type] || type,
    prev: null,
    next: null,
    businessData: bo || {},
  }

  switch (type) {
    case 'gateway':
      const expressions: ExpressionNode[] = []
      const expressionNode1: ExpressionNode = createNode('expression', '条件1')
      const expressionNode2: ExpressionNode = createNode('expression', '条件2')
      expressionNode1.parent = base as GatewayNode
      expressionNode2.parent = base as GatewayNode
      expressions.push(expressionNode1, expressionNode2)
      return {
        ...base,
        expressions,
        default: expressionNode1,
      } as GatewayNode
    case 'expression':
      return { ...base } as ExpressionNode
    case 'service':
      return { ...base } as ServiceNode
    case 'task':
      return { ...base } as TaskNode
    case 'subprocess':
      const subprocessStart = createNode('event', '开始', {
        $type: 'startEvent',
        cls: 'start-event',
      })
      subprocessStart.next = createNode('event', '结束', { $type: 'endEvent' })
      return {
        ...base,
        start: subprocessStart,
      } as SubprocessNode
    case 'event':
      return { ...base } as EventNode
    default:
      return base
  }
}
/**
 * 追加新节点
 * @param curNode 当前节点
 * @param newNode 追加节点
 */
export function appendNode(
  curNode: Ref<BaseNode>,
  newNode: Ref<BaseNode>,
): Ref<BaseNode> {
  const nextNode = curNode.value.next

  curNode.value.next = newNode.value
  newNode.value.prev = curNode.value

  if (nextNode) {
    nextNode.prev = newNode.value
    newNode.value.next = nextNode
  }

  setNodeInMap(newNode)

  return newNode
}
/**
 * 移除节点
 * @param curNode 被移除的目标节点
 */
export function removeNode(curNode: Ref<BaseNode>): Ref<BaseNode> {
  const prev = curNode.value.prev
  const next = curNode.value.next
  if (prev) {
    prev.next = next
  }
  if (next) {
    next.prev = prev
  }

  curNode.value.prev = null
  curNode.value.next = null

  removeNodeInMap(curNode.value.id)

  return curNode
}

/**
 * 移动节点到目标节点后面
 * @param targetNode 目标节点
 * @param node 被移动节点
 */
export function moveNode(
  targetNode: Ref<BaseNode>,
  node: Ref<BaseNode>,
): Ref<BaseNode> {
  setDragData()
  removeNode(node)
  return appendNode(targetNode, node)
}

/** *************************************************** 设置节点拖动状态 */
let dragData: Ref<BaseNode> | undefined

/**
 * 设置被拖拽节点
 // * @param event 事件对象
 * @param node 被拖拽节点
 */
export function setDragData(node?: Ref<BaseNode>) {
  dragData = node
  // event.dataTransfer?.setData('node-id', node.value.id)
}
/**
 * 获取被拖拽节点
 // * @param event 事件对象
 */
export function getDragData() {
  // event.preventDefault()
  // const id = event.dataTransfer?.getData('node-id')
  //
  // if (!id) {
  //   return
  // }
  // return getNodeInMap(id)
  return dragData
}

export function createPresetProcess() {
  const start = createNode('event', '开始', {
    $type: 'startEvent',
    cls: 'start-event',
  })
  const end = createNode('event', '结束', {
    $type: 'endEvent',
    cls: 'end-event',
  })
  start.next = end
  return start
}
