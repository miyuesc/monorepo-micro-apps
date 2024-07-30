/**
 * @desc transform
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/30 下午9:16
 */
import type { Ref } from 'vue'
import { isRef } from 'vue'
import type { BaseNode, BaseNodeBO, GatewayNode, SubprocessNode } from '@/types'

interface NodeJson {
  id: string
  type: string
  name: string
  businessData: BaseNodeBO

  $nextRef?: BaseNode['id']
  $prevRef?: BaseNode['id']
  $parentRef?: BaseNode['id']

  // 特殊节点属性部分
  expressionRefs?: NodeJson[]
  $startRef?: BaseNode['id']
  $defaultRef?: BaseNode['id']
}

export function toJson(node: BaseNode | Ref<BaseNode>) {
  if (isRef(node)) {
    node = node.value
  }
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
  const expressionRefs = expressions?.map(e => nodeToJson(e))
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
