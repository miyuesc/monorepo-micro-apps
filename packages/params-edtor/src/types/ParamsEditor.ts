/**
 * @desc ParamsEditor
 * @author DragonTeam <https://www.bpmport.com>
 * @since 2024/12/10 17:16
 */
import type { Component } from 'vue'

export interface ParamsEditorPattern {
  exp: RegExp
  message: string
}

export interface ParamsEditorConfig {
  paramLabel: string // 标签
  paramKey: string // 唯一标识（对应参数中的 key）
  show?: boolean // 是否显示

  component?: string | Component // 组件
  componentProps?: any // 组件属性

  helpMessage?: string // 提示信息
  required?: boolean // 是否必填
  unrepeatable?: boolean // 是否不可重复
  pattern?: ParamsEditorPattern | ParamsEditorPattern[] // 正则验证
  defaultValue?: any // 默认值
}
