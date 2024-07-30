/**
 * @desc transform
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/30 下午9:16
 */
import type { BaseNode, BaseNodeBO, GatewayNode, SubprocessNode } from '@/types'

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

export function toJson(node: BaseNode): NodeJson | undefined {
  if (!node)
    return undefined

  const result: NodeJson = nodeToJson(node)

  let parent: NodeJson = result
  let cur: BaseNode | undefined = node.$next
  while (cur) {
    const nextNode = nodeToJson(cur)

    // 特殊处理子流程
    if (cur.type === 'subprocess') {
      console.log(cur)
      nextNode.childNode = toJson((cur as SubprocessNode).$start as BaseNode)
    }

    parent.nextNode = nextNode

    cur = cur.$next
    parent = nextNode
  }

  return result
}

export function nodeToJson(node: BaseNode) {
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
  const expressionRefs = expressions?.map(e => toJson(e)!)
  const $startRef = $start?.id
  const $defaultRef = $default?.id

  const result: NodeJson = {
    id,
    type,
    name,
    businessData,
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
  if (expressionRefs) {
    result.expressionRefs = expressionRefs
  }
  if ($startRef) {
    result.$startRef = $startRef
  }
  if ($defaultRef) {
    result.$defaultRef = $defaultRef
  }

  return result
}
