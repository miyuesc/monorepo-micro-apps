import { onBeforeUnmount, onMounted } from 'vue'
import { type EventEmitterListener, emitterInstance } from '@miyue-mma/shared'

export function useEventEmitter(listenerType: string, listener: EventEmitterListener) {
  const thisListener = listener

  const removeListener = () => {
    emitterInstance.removeListener(listenerType, thisListener)
  }

  onMounted(() => {
    thisListener()
    if (emitterInstance.hasListener(listenerType, thisListener))
      return

    emitterInstance.addListener(listenerType, thisListener)
  })
  onBeforeUnmount(() => removeListener())

  return [thisListener, removeListener]
}
