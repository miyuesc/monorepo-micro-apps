import type { PropType } from 'vue'
import type { AsyncExecutionValidator, BaseNode, CanAppend, CanDropped, CanMove, CanRemove, ExecutionValidator } from '@/types'

function PropsGenerator<T>() {
  return {
    data: {
      type: Object as PropType<T>,
      default: () => null,
    },
    canRemove: {
      type: [Boolean, Function] as PropType<CanRemove>,
      default: true,
    },
    canAppend: {
      type: [Boolean, Function] as PropType<CanAppend>,
      default: () => (node: BaseNode) => node.businessData?.$type !== 'endEvent',
    },
    canMove: {
      type: [Boolean, Function] as PropType<CanMove>,
      default: () => (node: BaseNode) => node.businessData?.$type !== 'endEvent',
    },
    canDropped: {
      type: [Boolean, Function] as PropType<CanDropped>,
      default: true,
    },

    removeValidator: {
      type: Function as PropType<AsyncExecutionValidator>,
      default: () => async () => true,
    },
    completenessValidator: {
      type: Function as PropType<ExecutionValidator>,
      default: () => async () => true,
    },
  }
}

export default PropsGenerator
