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

export const globalConfig: GlobalConfig = {
  canRemove: true,
  canAppend: true,
  canMove: true,
  canDropped: true,
  removeValidator: async () => true,
  completenessValidator: () => true,
}

export function setGlobalConfig<K extends GlobalConfigKey>(key: K, configure: GlobalConfig[typeof key]) {
  globalConfig[key] = configure
}

export function getGlobalConfig<K extends GlobalConfigKey>(key: K): GlobalConfig[typeof key] {
  return globalConfig[key]
}
