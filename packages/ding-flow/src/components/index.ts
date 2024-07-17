import type { App } from 'vue'

import DingFlowList from './entry/DingFlowList.vue'

import NodeBehavior from './base/NodeBehavior.vue'
import TippyPopover from './base/TippyPopover.vue'

import EventNode from './nodes/EventNode.vue'
import ExpressionNode from './nodes/ExpressionNode.vue'
import GatewayNode from './nodes/GatewayNode.vue'
import ServiceNode from './nodes/ServiceNode.vue'
import SubprocessNode from './nodes/SubprocessNode.vue'
import TaskNode from './nodes/TaskNode.vue'

const components = [
  DingFlowList,
  NodeBehavior,
  TippyPopover,
  EventNode,
  ExpressionNode,
  GatewayNode,
  ServiceNode,
  SubprocessNode,
  TaskNode,
]

function install(app: App) {
  components.forEach((component) => {
    app.component(component.name as string, component)
  })
}

export default {
  install,
}
