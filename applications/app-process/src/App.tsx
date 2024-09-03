import './App.scss'
import { useEffect } from 'react'
import Modeler from 'bpmn-js/lib/Modeler'
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
} from 'bpmn-js-properties-panel'

function App() {
  let modeler: Modeler

  const initialDiagram
    = '<?xml version="1.0" encoding="UTF-8"?>'
    + '<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '
    + 'xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" '
    + 'xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" '
    + 'xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" '
    + 'targetNamespace="http://bpmn.io/schema/bpmn" '
    + 'id="Definitions_1">'
    + '<bpmn:process id="Process_1" isExecutable="false">'
    + '<bpmn:startEvent id="StartEvent_1"/>'
    + '</bpmn:process>'
    + '<bpmndi:BPMNDiagram id="BPMNDiagram_1">'
    + '<bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">'
    + '<bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">'
    + '<dc:Bounds height="36.0" width="36.0" x="173.0" y="102.0"/>'
    + '</bpmndi:BPMNShape>'
    + '</bpmndi:BPMNPlane>'
    + '</bpmndi:BPMNDiagram>'
    + '</bpmn:definitions>'

  function initModeler() {
    if (modeler)
      return
    modeler = new Modeler({
      container: '#designer',
      propertiesPanel: {
        parent: '#panel',
      },
      additionalModules: [
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
      ],
    })

    modeler.importXML(initialDiagram, (err) => {
      console.log(err)
    })

    console.log(modeler)
    console.log(modeler.get('propertiesPanel'))
  }

  useEffect(() => {
    initModeler()
  }, [])

  return (
    <>
      <div className="designer" id="designer"></div>
      <div className="panel" id="panel"></div>
    </>
  )
}

export default App
