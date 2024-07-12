/**
 * @desc vue 注入配置
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/12 下午2:05
 */

import type { InjectionKey } from 'vue'
import type { AppendMenuProvider, BaseNodeType } from '@/types'

type InjectionAppendMenuGetter<T extends BaseNodeType> = InjectionKey<AppendMenuProvider<T>>

export const appendMenuGetter: InjectionAppendMenuGetter<BaseNodeType> = Symbol('appendMenuGetter')
