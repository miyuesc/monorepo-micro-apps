/**
 * @desc index
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/31 下午4:42
 */
import BpmnModdle from 'bpmn-moddle'
import flowableDescriptor from './flowable.json'

export const moddle = new BpmnModdle({
  flowable: flowableDescriptor,
})
