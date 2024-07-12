import type { PropType } from 'vue'
import type { AsyncExecutionValidator, CanAdd, CanMove, CanRemove } from '@/types'

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
    canAdd: {
      type: [Boolean, Function] as PropType<CanAdd>,
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
