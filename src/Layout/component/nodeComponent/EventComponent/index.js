import React, { useState, useMemo } from 'react';
import { Button, Collapse, Select, Col, Form, Input, Icon } from 'antd';
import './index.css'
const { Panel } = Collapse;
const Page = ({ form: { getFieldDecorator, validateFields, resetFields }, onEventValueChange, canvasData }) => {

  const [eventData, setEventData] = useState(canvasData.node.events);

  /**
  * 新增事件
  */

  const onHandleAddEventListener = () => {
    const arr = [...eventData]
    arr.push({ type: "0", action: "0" });
    setEventData(arr);
  };

  const onHandleEventTypeChange = (e, idx) => {
    const data = [...eventData];
    data[idx].type = e;
    resetFields();
    setEventData(data);
  }

  const onHandleSelectEvent = (e, idx) => {
    const data = [...eventData];
    data[idx].action = e;
    resetFields();
    setEventData(data);
  }


  /**
  * 渲染自定义事件表单入口
  */

  const renderFontForm = (item, idx) => {
    return <Form>
      <Col span={24}>
        <Form.Item label="事件类型">
          {getFieldDecorator(`eventType${idx}`, {
            initialValue: item.type || void 0
          })(<Select placeholder="请选择事件类型" onSelect={value => onHandleEventTypeChange(value, idx)}>
            <Select.Option value="0">单击</Select.Option>
            <Select.Option value="1">双击</Select.Option>
            <Select.Option value="2">webSocket事件</Select.Option>
            <Select.Option value="3">MQTT</Select.Option>
          </Select>)}
        </Form.Item>
      </Col>
      {
        renderFormByEventType(item, idx)
      }
    </Form>
  };

  /**
  * 根据事件类型渲染事件行为表单
  */

  const renderFormByEventType = (item, idx) => {
    switch (item.type) {
      case '0': case'1':
        return   <><Col span={24}>
        <Form.Item label="事件行为">
          {getFieldDecorator(`event${idx}`, {
            initialValue: item.action || void 0
          })(<Select placeholder="请选择事件行为" onSelect={value => onHandleSelectEvent(value, idx)}>
            <Select.Option value="0">跳转链接</Select.Option>
            <Select.Option value="1">执行动画</Select.Option>
            <Select.Option value="2">执行函数</Select.Option>
            <Select.Option value="3">执行window下的全局函数</Select.Option>
            <Select.Option value="4">更新属性数据</Select.Option>
          </Select>)}
        </Form.Item>
      </Col>
      {
        renderFormByEvent(item, idx)
      }
      </>
      default:
        break;
    }
  }

  /**
  * 根据事件行为生成不同的表单
  */

  const renderFormByEvent = (item, idx) => {
    switch (item.action) {
      case '0':
        return <><Col span={24}>
        <Form.Item label="链接地址">
          {getFieldDecorator(`code${idx}`, {
            initialValue: item.value || void 0
          })(<Input placeholder="请输入链接地址" onChange={e => onHandleCodeChange(e, idx)} />)}
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="参数值">
          {getFieldDecorator(`params${idx}`, {
            initialValue: item.params || '_black'
          })(<Input placeholder="_black" />)}
        </Form.Item>
      </Col>
      </>
      case '2':
        return <Col span={24}>
        <Form.Item label="自定义代码">
          {getFieldDecorator(`code${idx}`, {
            initialValue: item.value || void 0
          })(<Input placeholder="请输入自定义代码" onChange={e => onHandleCodeChange(e, idx)} />)}
        </Form.Item>
      </Col>
      default:
        break;
    }
  }

  /**
  * value值的变化, 通知canvas更新画布的数据
  */

  const onHandleCodeChange = (e, idx) => {
    validateFields((err, value) => {
      if(err) return;
      eventData[idx] = {
        type: null,
        action: null,
        value: null
      }
      eventData[idx].type = +value[`eventType${idx}`];
      eventData[idx].action = +value[`event${idx}`];
      eventData[idx].value = e.target.value;
      eventData[idx].params = value[`params${idx}`] || '';
      onEventValueChange(eventData);
    });
  }

  /**
  * 删除自定义事件
  */

  const onHandleDeleteItem = idx => {
    const data = [...eventData];
    delete data[idx];
    resetFields();
    setEventData(data.filter(Boolean))
  }

  /**
  * 渲染事件列表
  */

  const renderPanel = useMemo(() => {
    if(eventData.length < 1) return;
    return <Collapse>{eventData.map(item => ({ ...item, action: String(item.action), type: String(item.type) })).map((item, index) => <Panel header={<div>{`自定义事件${index + 1}`} <Icon onClick={() => onHandleDeleteItem(index)} type="delete"/></div>} key={index}>
      {
        renderFontForm(item, index)
      }
    </Panel>)}</Collapse>
  }, [eventData, renderFontForm])

  return (
    <div>
      <Button type="primary" className="event-button" onClick={onHandleAddEventListener}>新增事件</Button>
      {
        renderPanel
      }
    </div>
  );
};

export default  Form.create()(Page);