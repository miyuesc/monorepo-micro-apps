/**
 * @desc mock-xml
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/31 下午4:36
 */

export default `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:flowable="http://flowable.org/bpmn" id="Definitions_abckey123456" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn:process id="abckey123456" name="测试流程" isExecutable="true" flowable:candidateStarterUsers="10000">
    <bpmn:extensionElements>
      <flowable:idmCandidateUsers>[{"id":"1","name":"易烊千玺","code":"10000","email":"liuwenjun05101@163.com","mobile":null,"companyName":"中国石化","deptName":"领导班子"}]</flowable:idmCandidateUsers>
    </bpmn:extensionElements>
    <bpmn:startEvent id="Event_198vku3" flowable:initiator="initiator">
      <bpmn:outgoing>Flow_1tdjwug</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:userTask id="Activity_0p84u33" flowable:assignee="\${initiator}" flowable:skipExpression="\${initiator == &#39;&#39;}">
      <bpmn:extensionElements>
        <flowable:assigneeType>static</flowable:assigneeType>
      </bpmn:extensionElements>
      <bpmn:incoming>Flow_1tdjwug</bpmn:incoming>
      <bpmn:outgoing>Flow_0dfn1pl</bpmn:outgoing>
      <bpmn:outgoing>Flow_1i2hinq</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:sequenceFlow id="Flow_1tdjwug" sourceRef="Event_198vku3" targetRef="Activity_0p84u33" />
    <bpmn:exclusiveGateway id="Gateway_1eymh9b">
      <bpmn:incoming>Flow_0dfn1pl</bpmn:incoming>
      <bpmn:outgoing>Flow_0cnsdh3</bpmn:outgoing>
    </bpmn:exclusiveGateway>
    <bpmn:sequenceFlow id="Flow_0dfn1pl" sourceRef="Activity_0p84u33" targetRef="Gateway_1eymh9b" />
    <bpmn:userTask id="Activity_08i1biq" name="顶顶顶顶" flowable:assignee="123123">
      <bpmn:extensionElements>
        <flowable:assigneeType>static</flowable:assigneeType>
        <flowable:staticAssigneeVariables>[]</flowable:staticAssigneeVariables>
      </bpmn:extensionElements>
      <bpmn:incoming>Flow_0cnsdh3</bpmn:incoming>
      <bpmn:incoming>Flow_1ab8ejp</bpmn:incoming>
      <bpmn:outgoing>Flow_1uul2n5</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:sequenceFlow id="Flow_0cnsdh3" sourceRef="Gateway_1eymh9b" targetRef="Activity_08i1biq" />
    <bpmn:subProcess id="Activity_109fr7n">
      <bpmn:incoming>Flow_1i2hinq</bpmn:incoming>
      <bpmn:outgoing>Flow_1ab8ejp</bpmn:outgoing>
      <bpmn:startEvent id="Event_1wi7y07" flowable:initiator="initiator">
        <bpmn:outgoing>Flow_1nlyisl</bpmn:outgoing>
      </bpmn:startEvent>
      <bpmn:userTask id="Activity_06oh7l3" flowable:assignee="\${initiator}" flowable:skipExpression="\${initiator == &#39;&#39;}">
        <bpmn:extensionElements>
          <flowable:assigneeType>static</flowable:assigneeType>
        </bpmn:extensionElements>
        <bpmn:incoming>Flow_1nlyisl</bpmn:incoming>
        <bpmn:outgoing>Flow_0hjbatw</bpmn:outgoing>
      </bpmn:userTask>
      <bpmn:sequenceFlow id="Flow_1nlyisl" sourceRef="Event_1wi7y07" targetRef="Activity_06oh7l3" />
      <bpmn:endEvent id="Event_03x4jfy">
        <bpmn:incoming>Flow_0hjbatw</bpmn:incoming>
      </bpmn:endEvent>
      <bpmn:sequenceFlow id="Flow_0hjbatw" sourceRef="Activity_06oh7l3" targetRef="Event_03x4jfy" />
    </bpmn:subProcess>
    <bpmn:sequenceFlow id="Flow_1i2hinq" sourceRef="Activity_0p84u33" targetRef="Activity_109fr7n" />
    <bpmn:sequenceFlow id="Flow_1ab8ejp" sourceRef="Activity_109fr7n" targetRef="Activity_08i1biq" />
    <bpmn:endEvent id="Event_01eyrp1">
      <bpmn:incoming>Flow_1uul2n5</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_1uul2n5" sourceRef="Activity_08i1biq" targetRef="Event_01eyrp1" />
    <bpmn:boundaryEvent id="Event_1jf7hv6" flowable:cancelActivity="true" attachedToRef="Activity_08i1biq">
      <bpmn:escalationEventDefinition id="EscalationEventDefinition_16zdjhh" />
    </bpmn:boundaryEvent>
  </bpmn:process>
</bpmn:definitions>`
