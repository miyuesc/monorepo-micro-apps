import type { PropType } from 'vue'
import type { AsyncExecutionValidator, CanAppend, CanMove, CanRemove } from '@/types'

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
      default: true,
    },
    canMove: {
      type: [Boolean, Function] as PropType<CanMove>,
      default: true,
    },

    removeValidator: {
      type: Function as PropType<AsyncExecutionValidator>,
      default: () => async () => true,
    },
  }
}

export default PropsGenerator
