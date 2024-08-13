/**
 * @desc bpmn-node
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/31 下午4:57
 */

export interface BpmnBase {
  $type: string
}

export interface BpmnModdleElement extends BpmnBase {
}

export interface BpmnElement extends BpmnModdleElement {
  id: string
  name: string
  extensionElements?: BpmnModdleElement[]
}

export interface BpmnFlow extends BpmnElement {
  sourceRef: BpmnElement
  targetRef: BpmnElement
}

export interface BpmnDefinitions extends BpmnElement {
  targetNamespace: string
  rootElements: BpmnRoot[]
}

export interface BpmnRoot extends BpmnElement {
  isExecutable?: boolean
  flowElements: BpmnElement[]
}
