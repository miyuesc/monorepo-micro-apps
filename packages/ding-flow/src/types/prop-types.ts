/**
 * @desc 组件Props参数类型定义
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/12 上午10:06
 */

import type { BaseNode, BaseNodeType } from '@/types/node-models'

// 排版方向
export type FlowDirection = 'horizontal' | 'vertical'

// append 弹出菜单
export type AppendMenuProvider<T extends BaseNodeType> = (node: BaseNode) => T[]
