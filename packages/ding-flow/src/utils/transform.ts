/**
 * @desc transform
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/30 下午9:16
 */
import type { BaseNode, BaseNodeBO, GatewayNode, SubprocessNode } from '@/types'
import { moddle } from '@/bpmn-moddle'
import type { BpmnDefinitions, BpmnElement, BpmnFlow, BpmnRoot } from '@/types/bpmn-node'
import { capitalize } from '@/utils/tools'
import { createNode } from '@/utils/element-utils'

interface NodeJson {
  id: string
  type: string
  name: string
  businessData: BaseNodeBO

  nextNode?: NodeJson
  childNode?: NodeJson
  expressionNodes?: NodeJson[]

  $nextRef?: BaseNode['id']
  $prevRef?: BaseNode['id']
  $parentRef?: BaseNode['id']

  // 特殊节点属性部分
  expressionRefs?: NodeJson[]
  $startRef?: BaseNode['id']
  $defaultRef?: BaseNode['id']
}

// 转为可用 json
export function transformNodeToJson(node: BaseNode) {
  const {
    id,
    type,
    name,
    businessData,
    $next,
    $prev,
    $parent,
  } = node
  const expressions = (node as GatewayNode).$expressions
  const $default = (node as GatewayNode).$default
  const $start = (node as SubprocessNode).$start

  const $nextRef = $next?.id
  const $prevRef = $prev?.id
  const $parentRef = $parent?.id
  const expressionRefs = expressions?.map(e => transformToJson(e)!)
  const $startRef = $start?.id
  const $defaultRef = $default?.id

  const result: NodeJson = {
    id,
    type,
    name,
    businessData,
  }

  if (expressionRefs) {
    result.expressionRefs = expressionRefs
  }

  if ($nextRef) {
    result.$nextRef = $nextRef
  }
  if ($prevRef) {
    result.$prevRef = $prevRef
  }
  if ($nextRef) {
    result.$nextRef = $nextRef
  }
  if ($parentRef) {
    result.$parentRef = $parentRef
  }
  if ($startRef) {
    result.$startRef = $startRef
  }
  if ($defaultRef) {
    result.$defaultRef = $defaultRef
  }

  return result
}
export function transformToJson(node: BaseNode): NodeJson | undefined {
  if (!node)
    return undefined

  const result: NodeJson = transformNodeToJson(node)

  let parent: NodeJson = result
  let cur: BaseNode | undefined = node.$next
  while (cur) {
    const nextNode = transformNodeToJson(cur)

    // 特殊处理子流程
    if (cur.type === 'subprocess') {
      nextNode.childNode = transformToJson((cur as SubprocessNode).$start as BaseNode)
    }

    parent.nextNode = nextNode

    cur = cur.$next
    parent = nextNode
  }

  return result
}

// 转为符合绘图数据格式的互相引用对象
export function parseJsonToNode(node: NodeJson) {
  const { id, name, businessData, type } = node

  // @ts-expect-error
  const result: BaseNode = createNode(type, undefined, name, businessData)
  result.id = id

  return result
}
export function parseJsonToNodeTree(node: NodeJson) {
  if (!node)
    return undefined

  const result: BaseNode = parseJsonToNode(node)

  return result
}

/* bpmn 相关 */
type BpmnProps = Record<string, any>

export function createBpmnDefinitions() {
  const defs = moddle.create<BpmnDefinitions>('bpmn:Definitions')
  defs.rootElements = []
  return defs
}

export function createBpmnProcess(props: BpmnProps) {
  const process = moddle.create<BpmnRoot>('bpmn:Process', { ...props })
  process.flowElements = []
  return process
}

export function createBpmnSubprocess(props: BpmnProps) {
  const process = moddle.create<BpmnRoot>('bpmn:SubProcess', { ...props })
  process.flowElements = []
  return process
}

export function createBpmnElement(type: string, props: BpmnProps) {
  return moddle.create<BpmnElement>(`bpmn:${capitalize(type)}`, props)
}

export function createBpmnSequenceFlow(source: BpmnElement, target: BpmnElement, props: BpmnProps = {}) {
  const flow = moddle.create<BpmnFlow>(`bpmn:SequenceFlow`, props)
  flow.sourceRef = source
  flow.targetRef = target
  return flow
}

let lastBpmnNode: BpmnElement | undefined

function transformNode(node: BaseNode, parentArray: BpmnElement[]) {
  const { id, name, type, businessData } = node
  let current: BpmnElement
  if (type === 'subprocess') {
    current = transformSubprocessNode(node as SubprocessNode)
  }
  else {
    current = createBpmnElement(businessData.$type || 'task', { id, name })
  }

  if (lastBpmnNode) {
    parentArray.push(createBpmnSequenceFlow(lastBpmnNode, current))
  }

  lastBpmnNode = current

  return current
}

function transformSubprocessNode(node: SubprocessNode): BpmnRoot {
  const { id, name, $start } = node
  const subprocess = createBpmnSubprocess({ id, name })
  let cur: BaseNode | undefined = $start
  while (cur) {
    if (cur.type === 'subprocess') {
      subprocess.flowElements.push(transformSubprocessNode(cur as SubprocessNode))
    }
    else {
      subprocess.flowElements.push(transformNode(cur, subprocess.flowElements))
    }
    cur = cur.$next
  }

  return subprocess
}

export async function transformToXML(node: BaseNode): Promise<{ xml: string }> {
  const definitions = createBpmnDefinitions()
  const process = createBpmnProcess({})
  definitions.rootElements = [process]

  let cur: BaseNode | undefined = node
  while (cur) {
    process.flowElements.push(transformNode(cur, process.flowElements))
    cur = cur.$next
  }

  lastBpmnNode = undefined
  return await moddle.toXML(definitions, { format: true, preamble: true })
}
