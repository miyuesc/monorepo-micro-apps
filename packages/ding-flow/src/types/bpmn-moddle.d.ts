/**
 * @desc bpmn-moddle.d
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/31 下午5:06
 */

declare module 'bpmn-moddle' {
  import type { BpmnElement, BpmnModdleElement, BpmnRoot } from '@/types/bpmn-node'

  export interface ParseReference {
    id: string
    property: string
    element: BpmnElement
  }

  export interface ParseResult {
    rootElement: BpmnRoot
    references: ParseReference[]
    warnings: any[]
    elementsById: Record<string, BpmnElement>
  }

  export default class BpmnModdle {
    constructor(options: Record<string, any>)

    fromXML(xmlStr: string, typeName: string = 'bpmn:Definitions', options?: Record<string, any>): Promise<ParseResult>
    toXML(element: BpmnElement, options?: { format?: boolean, preamble?: boolean }): Promise<{ xml: string }>

    create<T extends BpmnModdleElement = BpmnModdleElement>(type: string, props?: Record<string, any>): T
    getType(descriptor: string | object): Record<string, any>
    createAny(name: string, nsUri: string, properties: Record<string, any>): BpmnModdleElement
    hasType(element: BpmnElement, type: string): boolean
  }
}
