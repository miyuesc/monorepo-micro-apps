/**
 * @desc global-config
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/19 下午3:19
 */
import type {
  AsyncExecutionValidator,
  CanAppend,
  CanDropped,
  CanMove,
  CanRemove,
  ExecutionValidator,
  SubprocessNode,
} from '@/types'

export interface GlobalConfig {
  canRemove: CanRemove
  canAppend: CanAppend
  canMove: CanMove
  canDropped: CanDropped
  removeValidator: AsyncExecutionValidator
  completenessValidator: ExecutionValidator
}
export type GlobalConfigKey = keyof GlobalConfig

export const defaultAppendValidator: CanAppend = (node) => {
  if (!node)
    return false
  return node.businessData?.$type !== 'endEvent'
}
export const defaultMoveValidator: CanMove = (node) => {
  if (!node)
    return false
  return node.businessData?.$type !== 'endEvent'
    && node.businessData?.$type !== 'startEvent'
    && node.type !== 'expression'
}
export const defaultDropValidator: CanDropped = (target, node) => {
  if (!node)
    return false

  if (node.type === 'gateway' || node.type === 'subprocess') {
    let $parent = target?.$parent
    while ($parent) {
      if ($parent.id === node.id) {
        return false
      }
      $parent = $parent.$parent
    }
  }

  return target!.$next?.id !== node.id && target!.id !== node.id
}
export const defaultCompletenessValidator: ExecutionValidator = (target) => {
  if (!target)
    return false
  if (target.type === 'expression')
    return !!target.businessData.expression
  if (target.type === 'subprocess')
    return !!(target as SubprocessNode).start
  return true
}

export const globalConfig: GlobalConfig = {
  canRemove: true,
  canAppend: defaultAppendValidator,
  canMove: defaultMoveValidator,
  canDropped: defaultDropValidator,
  removeValidator: async () => true,
  completenessValidator: defaultCompletenessValidator,
}

export function setGlobalConfig<K extends GlobalConfigKey>(
  key: K,
  configure?: GlobalConfig[typeof key],
) {
  if (configure) {
    globalConfig[key] = configure
  }
}

export function getGlobalConfig<K extends GlobalConfigKey>(
  key: K,
): GlobalConfig[typeof key] {
  return globalConfig[key]
}
